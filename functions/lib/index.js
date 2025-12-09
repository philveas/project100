"use strict";
// functions/src/index.ts
// Contact form Cloud Function (Firestore + Google Sheets + Resend, v2)
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactForm = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const googleapis_1 = require("googleapis");
const resend_1 = require("resend");
// Initialise Firebase Admin once
if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();
// CORS handler
const corsHandler = (0, cors_1.default)({ origin: true });
// Google Sheets settings
const SHEET_ID = "18q_c9cOuJbjrahAEqRS30-gviiuk-XsCdmqwpugwY70";
const SHEET_RANGE = "Submissions!A6:H"; // headers row 5
// Google Sheets auth
const auth = new googleapis_1.google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
// Main Cloud Function
exports.handleContactForm = (0, https_1.onRequest)({
    region: "europe-west2",
    secrets: ["RESEND_API_KEY"],
}, async (req, res) => {
    return corsHandler(req, res, async () => {
        var _a;
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ success: false, message: "Method Not Allowed" });
        }
        const { name, company, email, telephone, projectAddress, message, gdprConsent, } = (req.body || {});
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
            const sheets = googleapis_1.google.sheets({
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
                const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
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
              <p><strong>GDPR Consent:</strong> ${gdprConsent === "on" ? "Yes" : "No"}</p>
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
            }
            catch (emailErr) {
                logger.error("❌ Email sending failed:", emailErr);
            }
            // All good
            return res.status(200).json({
                success: true,
                message: "✅ Data logged, sheet updated, and emails sent.",
            });
        }
        catch (err) {
            logger.error("❌ Error in contact form:", err);
            return res.status(500).json({
                success: false,
                message: "Server error",
                error: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "Unknown error",
            });
        }
    });
});
