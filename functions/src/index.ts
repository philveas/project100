// functions/src/index.ts
// Contact form Cloud Function (Firestore + Google Sheets + Resend, v2)

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import cors from "cors";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import { Resend } from "resend";

// Initialise Firebase Admin once
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// CORS handler
const corsHandler = cors({ origin: true });

// Google Sheets settings
const SHEET_ID = "18q_c9cOuJbjrahAEqRS30-gviiuk-XsCdmqwpugwY70";
const SHEET_RANGE = "Submissions!A6:H"; // headers row 5

// Google Sheets auth
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Main Cloud Function
export const handleContactForm = onRequest(
  {
    region: "europe-west2",
       secrets: ["RESEND_API_KEY"],
  },
  async (req, res) => {
    return corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        return res
          .status(405)
          .json({ success: false, message: "Method Not Allowed" });
      }

      const {
        name,
        company,
        email,
        telephone,
        projectAddress,
        message,
        gdprConsent,
      } = (req.body || {}) as {
        name?: string;
        company?: string;
        email?: string;
        telephone?: string;
        projectAddress?: string;
        message?: string;
        gdprConsent?: string;
      };

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      const submittedAt = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      });

      try {
        // 1️⃣ Firestore write
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

        // 2️⃣ Google Sheets append
        const sheets = google.sheets({
          version: "v4",
          auth,
        });

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

        // 3️⃣ Emails via Resend
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
        } catch (emailErr) {
          logger.error("❌ Email sending failed:", emailErr);
        }

        // All good
        return res.status(200).json({
          success: true,
          message: "✅ Data logged, sheet updated, and emails sent.",
        });
      } catch (err: any) {
        logger.error("❌ Error in contact form:", err);
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: err?.message ?? "Unknown error",
        });
      }
    });
  }
);
