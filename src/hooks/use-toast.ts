"use client";

import * as React from "react";

// --- Types -------------------------------------------------------------------
type ToastActionElement = React.ReactElement | null;

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  /**
   * "default" | "destructive"
   */
  variant?: "default" | "destructive";
  /**
   * How long to show (ms). Falls back to TOAST_DURATION if unset.
   */
  duration?: number;
};

type ToasterToast = Toast & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ToastState = {
  toasts: ToasterToast[];
};

type ToastOpts = Omit<Toast, "id" | "open" | "onOpenChange">;

// --- Store (evented + useSyncExternalStore) ----------------------------------
const TOAST_DURATION = 3000;
const TOAST_REMOVE_DELAY = 1000;

const listeners = new Set<() => void>();
let memoryState: ToastState = { toasts: [] };

function emit() {
  for (const l of listeners) l();
}

function updateToast(id: string, partial: Partial<ToasterToast>) {
  memoryState = {
    ...memoryState,
    toasts: memoryState.toasts.map((t) => (t.id === id ? { ...t, ...partial } : t)),
  };
  emit();
}

function actuallyRemoveClosedToasts() {
  memoryState = {
    ...memoryState,
    toasts: memoryState.toasts.filter((t) => t.open !== false),
  };
  emit();
}

function dismissToast(id?: string) {
  if (id) {
    updateToast(id, { open: false });
  } else {
    memoryState.toasts.forEach((t) => updateToast(t.id, { open: false }));
  }
  // remove after a short delay (lets close animation run)
  setTimeout(actuallyRemoveClosedToasts, TOAST_REMOVE_DELAY);
}

function addToast(toast: Toast) {
  const id = toast.id;
  const onOpenChange = (open: boolean) => updateToast(id, { open });

  const t: ToasterToast = {
    open: true,
    onOpenChange,
    duration: toast.duration ?? TOAST_DURATION,
    ...toast,
    id,
  };

  memoryState = { ...memoryState, toasts: [t, ...memoryState.toasts] };
  emit();

  // Auto-dismiss after duration
  const ms = t.duration ?? TOAST_DURATION;
  if (Number.isFinite(ms) && ms! > 0) {
    setTimeout(() => dismissToast(id), ms);
  }
}

const toastStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getState: () => memoryState,
  add: addToast,
  update: updateToast,
  dismiss: dismissToast,
  clearAll: () => dismissToast(), // convenience
};

// --- Hook API ----------------------------------------------------------------
function useToastState() {
  return React.useSyncExternalStore(toastStore.subscribe, toastStore.getState, toastStore.getState);
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return String(idCounter);
}

export function useToast() {
  const state = useToastState();

  const toast = React.useCallback((opts: ToastOpts) => {
    const id = nextId();
    toastStore.add({ ...opts, id });
    return {
      id,
      dismiss: () => toastStore.dismiss(id),
      update: (partial: Partial<ToasterToast>) => toastStore.update(id, partial),
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: toastStore.dismiss,
    clearAll: toastStore.clearAll,
  };
}

// Imperative helper (outside React)
export const toast = (...args: Parameters<ReturnType<typeof useToast>["toast"]>) => {
  const [opts] = args;
  const id = nextId();
  toastStore.add({ ...opts, id });
  return {
    id,
    dismiss: () => toastStore.dismiss(id),
    update: (partial: Partial<ToasterToast>) => toastStore.update(id, partial),
  };
};
