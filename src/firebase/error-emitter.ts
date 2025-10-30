// src/firebase/error-emitter.ts

export type AppError = Error & { code?: string };

/**
 * Minimal typed event emitter that supports named events.
 * No `any` usage—only `unknown` with safe, local casts.
 */
class TypedEmitter<Events extends Record<string, unknown>> {
  // store listeners as unknown to avoid `any`
  private listeners = new Map<string, Set<(payload: unknown) => void>>();

  on<K extends keyof Events & string>(
    event: K,
    listener: (payload: Events[K]) => void
  ): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    // store as unknown-typed function
    set.add(listener as (payload: unknown) => void);

    return () => this.off(event, listener);
  }

  off<K extends keyof Events & string>(
    event: K,
    listener: (payload: Events[K]) => void
  ): void {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(listener as (payload: unknown) => void);
    if (set.size === 0) this.listeners.delete(event);
  }

  emit<K extends keyof Events & string>(event: K, payload: Events[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    // cast back when calling
    for (const fn of set) {
      try {
        (fn as (p: Events[K]) => void)(payload);
      } catch {
        // ignore listener errors
      }
    }
  }
}

// Declare the events your app may emit here.
type ErrorEvents = {
  error: AppError;
  "permission-error": AppError;
};

export const errorEmitter = new TypedEmitter<ErrorEvents>();
