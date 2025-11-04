// src/firebase/index.ts
import { initializeApp, type FirebaseApp, getApps } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  analytics?: Analytics;
};

export function initializeFirebase(): FirebaseServices {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error("Missing Firebase env vars. Did you create .env.local?");
  }

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  };

  const apps = getApps();
  const app: FirebaseApp = apps.length > 0 ? apps[0]! : initializeApp(config);

  const auth = getAuth(app);

  // ✅ Connect to your explicit Firestore database ID: websitedata1
  const db = getFirestore(app, "websitedata1");

  const storage = getStorage(app);

  if (typeof window !== "undefined") {
    isSupported()
      .then((ok) => {
        if (ok) getAnalytics(app);
      })
      .catch(() => {});
  }

  return { app, auth, db, storage };
}
