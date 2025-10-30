// src/firebase/errors.ts

export type FirestoreOperation = "get" | "set" | "update" | "delete" | "listen";

export interface FirestoreErrorContext {
  path: string;
  operation: FirestoreOperation;
}

/**
 * Error thrown when Firestore denies permission for an operation.
 * Matches usage: new FirestorePermissionError({ path, operation }, err)
 */
export class FirestorePermissionError extends Error {
  name = "FirestorePermissionError";
  code = "permission-denied" as const;
  context: FirestoreErrorContext;
  cause?: unknown;

  constructor(context: FirestoreErrorContext, cause?: unknown) {
    super(`Permission denied for ${context.operation} on ${context.path}`);
    this.context = context;
    this.cause = cause;
  }
}
