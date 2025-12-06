import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import cors from "cors";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import { Resend } from "resend";

// ✅ Initialize Firebase Admin SDK
if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

// ✅ Google Sheets Info
const SHEET_ID = "18q_c9cOuJbjrahAEqRS30-gviiuk-XsCdmqwpugwY70";
const SHEET_RANGE = "Submissions!A6:H"; // Headers in row 5

// ✅ Google Sheets Auth
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// ✅ Cloud Function Entry
export const handleContactForm = onRequest(
  {
    region: "europe-west2",
    secrets: ["RESEND_API_KEY"],
  },
  async (req, res) => {
    return corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          success: false,
          message: "Method not allowed",
        });
      }

      const {
        name,
        company,
        email,
        telephone,
        projectAddress,
        message,
        gdprConsent,
      } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const submittedAt = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      });

      try {
        // ✅ Step 1: Store in Firestore
        try {
          const docRef = await db.collection("contact_submissions").add({
            name,
            company: company || "",
            email,
            telephone: telephone || "",
            projectAddress: projectAddress || "",
            message,
            gdprConsent: gdprConsent === "on",
            submittedAt,
          });
          logger.info(`✅ Firestore write OK: ${docRef.id}`);
        } catch (firestoreErr: any) {
          logger.error("❌ Firestore PERMISSION error:", firestoreErr);
          throw new Error("FIRESTORE_PERMISSION");
        }

        // ✅ Step 2: Append to Google Sheets
        try {
          const client = await auth.getClient();
          const sheets = google.sheets({ version: "v4", auth: client as any });
          await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: SHEET_RANGE,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  submittedAt,
                  name,
                  company || "",
                  email,
                  telephone || "",
                  projectAddress || "",
                  message,
                  gdprConsent === "on" ? "Yes" : "No",
                ],
              ],
            },
          });
          logger.info("✅ Sheets append OK");
        } catch (sheetErr: any) {
          logger.error("❌ Sheets PERMISSION error:", sheetErr);
          throw new Error("SHEETS_PERMISSION");
        }

        // ✅ Step 3: Send emails via Resend
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);

          // Internal email (to you)
          await resend.emails.send({
            from: "Veas Acoustics <no-reply@veasacoustics.com>",
            to: ["info@veasacoustics.com"],
            subject: `New Enquiry from ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || "—"}</p>
              <p><strong>Telephone:</strong> ${telephone || "—"}</p>
              <p><strong>Project Address:</strong> ${projectAddress || "—"}</p>
              <p><strong>GDPR Consent:</strong> ${
                gdprConsent === "on" ? "Yes" : "No"
              }</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          });

          // Thank-you email (to sender)
          await resend.emails.send({
            from: "Veas Acoustics <no-reply@veasacoustics.com>",
            to: [email],
            subject: "Thank you for contacting Veas Acoustics",
            html: `
              <h2>Thank you, ${name}</h2>
              <p>We’ve received your message and will get back to you soon.</p>
              <blockquote><p>${message}</p></blockquote>
              <p>Best regards,<br><strong>The Veas Acoustics Team</strong></p>
            `,
          });

          logger.info("📧 Emails sent successfully via Resend");
        } catch (emailErr: any) {
          logger.error("❌ Email sending failed:", emailErr);
        }

        // ✅ All good
        return res.status(200).json({
          success: true,
          message: "✅ Data logged, sheet updated, and emails sent.",
        });
      } catch (err: any) {
        const type =
          err.message === "FIRESTORE_PERMISSION"
            ? "Firestore"
            : err.message === "SHEETS_PERMISSION"
            ? "Sheets"
            : "Unknown";
        logger.error("❌ Error in contact form:", err);
        return res.status(500).json({
          success: false,
          message: `Permission error in ${type}`,
          error: err.message,
        });
      }
    });
  }
);
