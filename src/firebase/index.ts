// src/firebase/index.ts
import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

// ⬅️ NEW: Import the configuration from the static file we created.
import { FIREBASE_STATIC_CONFIG } from "@/config/firebase"; 

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  analytics?: Analytics | null;
};

export function initializeFirebase(): FirebaseServices {
  // Use the STATIC config object directly.
  const config = FIREBASE_STATIC_CONFIG; 

  // Since the config is now static, we don't need any process.env checks here.

  const app = getApps().length > 0 ? getApp() : initializeApp(config);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  let analytics: Analytics | null = null;
  if (typeof window !== "undefined") {
    isSupported().then((ok) => {
      if (ok) analytics = getAnalytics(app);
    });
  }

  return { app, auth, db, storage, analytics };
}

// Optionally, export initialized services for convenience across the app
const { app, auth, db, storage, analytics } = initializeFirebase();
export { app, auth, db, storage, analytics };