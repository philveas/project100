import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";

// Initialize Firebase Admin SDK
admin.initializeApp();

// --- CONTACT FORM FUNCTION ---
export const handleContactForm = functions.https.onRequest(
  { region: "europe-west2" },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const data = req.body;
      console.log("📩 Received contact form data:", data);

      // Example: save to Firestore
      await admin.firestore().collection("contact_submissions").add({
        ...data,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("❌ Error in handleContactForm:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// --- NEXT.JS SSR HANDLER (PLACEHOLDER FOR NOW) ---
const app = express();

// Optional: serve a basic response for now
app.get(/.*/, (_req, res) => {
  res.send("✅ Next.js SSR handler placeholder active.");
});


// You can later wire this to your actual SSR build output
export const next_server = functions.https.onRequest(
  { region: "europe-west2" },
  app
);
