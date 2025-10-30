// src/firebase/client-provider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseProvider, type FirebaseServices } from './provider';
import { initializeFirebase } from './index';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    const services = initializeFirebase();
    setFirebase(services);
  }, []);

  if (!firebase) return null; // or a small loader

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
