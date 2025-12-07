// src/firebase/index.ts
import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

// 1. Get the JSON configuration string from the environment variable provided by Firebase.
const firebaseConfigJson = process.env.FIREBASE_WEBAPP_CONFIG;

if (!firebaseConfigJson) {
  // If the key is missing, throw a fatal error during build/runtime.
  // This is the cleanest way to debug a deployment failure.
  throw new Error(
    "FATAL: FIREBASE_WEBAPP_CONFIG environment variable is missing. Check App Hosting configuration."
  );
}

// 2. Parse the JSON string into the configuration object.
const config = JSON.parse(firebaseConfigJson);

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  analytics?: Analytics | null;
};

export function initializeFirebase(): FirebaseServices {
  // Use the parsed 'config' object for initialization.
  const app = getApps().length > 0 ? getApp() : initializeApp(config);

  const auth = getAuth(app);
  
  // NOTE: If you need a specific database ID, you may need to adjust this line:
  // const db = getFirestore(app, "websitedata1");
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