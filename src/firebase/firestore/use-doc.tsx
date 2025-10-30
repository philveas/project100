// src/firebase/firestore/use-doc.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import type {
  FirestoreError,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useDoc<T extends DocumentData>(
  docRef: DocumentReference<T> | null
) {
  const [data, setData] = useState<(T & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const refRef = useRef(docRef);
  useEffect(() => {
    refRef.current = docRef;
  }, [docRef]);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: DocumentSnapshot<T>) => {
        if (snapshot.exists()) {
          const value = { id: snapshot.id, ...snapshot.data()! } as T & {
            id: string;
          };
          setData(value);
        } else {
          setData(null);
        }
        setError(null);
        setLoading(false);
      },
      (err: FirestoreError) => {
        const permissionError = new FirestorePermissionError(
          { path: docRef.path, operation: 'get' },
          err
        );
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, loading, error };
}
