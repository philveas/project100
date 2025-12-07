"use strict";
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
exports.next_server = exports.handleContactForm = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
// Initialize Firebase Admin SDK
admin.initializeApp();
// --- CONTACT FORM FUNCTION ---
exports.handleContactForm = functions.https.onRequest({ region: "europe-west2" }, async (req, res) => {
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
    }
    catch (error) {
        console.error("❌ Error in handleContactForm:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// --- NEXT.JS SSR HANDLER (PLACEHOLDER FOR NOW) ---
const app = (0, express_1.default)();
// Optional: serve a basic response for now
app.get(/.*/, (_req, res) => {
    res.send("✅ Next.js SSR handler placeholder active.");
});
// You can later wire this to your actual SSR build output
exports.next_server = functions.https.onRequest({ region: "europe-west2" }, app);
//# sourceMappingURL=index.js.map