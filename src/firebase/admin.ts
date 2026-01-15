// src/firebase/admin.ts
import "server-only";

import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length) return;

  const sa =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT?.trim() ||
    (process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_B64
      ? Buffer.from(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_B64, "base64")
          .toString("utf8")
          .trim()
      : "");

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT;

  if (!sa) {
    throw new Error(
      "Missing FIREBASE_ADMIN_SERVICE_ACCOUNT or FIREBASE_ADMIN_SERVICE_ACCOUNT_B64. Do not use ADC locally. Add one of these to .env.local (and hosting env vars)."
    );
  }

  let serviceAccount: any;
  try {
    serviceAccount = JSON.parse(sa);
  } catch {
    throw new Error(
      "Service account is not valid JSON after decoding. Check your env var value."
    );
  }

  initializeApp({
    credential: cert(serviceAccount),
    projectId: projectId || serviceAccount.project_id,
  });
}

initAdmin();

export const adminDb = getFirestore();
