// src/firebase/index.ts
import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  analytics?: Analytics | null;
};

export function initializeFirebase(): FirebaseServices {
  // 🛑 FAIL-FAST CHECK: Throw an error if the key is missing. 
  // This is better than passing an empty string ("") which causes the Firebase crash.
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_FIREBASE_API_KEY. Environment variables failed to load during deployment."
    );
  }

  const config = {
    // ✅ Use non-null assertion (!) because the check above guarantees it exists
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  };

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