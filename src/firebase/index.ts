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
    apiKey: "AIzaSyCpstQgcD-UdP4RhrRykJlCqknluZVjGnM",
    authDomain: "veas-acoustics-100.firebaseapp.com",
    projectId: "veas-acoustics-100",
    storageBucket: "veas-acoustics-100.firebasestorage.app",
    messagingSenderId: "503507204027",
    appId: "1:503507204027:web:87ea76e40b07387922369e",
    measurementId: "G-NF4258JSND",
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
