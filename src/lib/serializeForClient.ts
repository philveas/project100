// src/lib/serializeForClient.ts

export function serializeForClient<T = any>(v: T): T {
  if (v == null) return v;

  // Firestore Timestamp (admin/web SDK): has toDate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyV: any = v as any;

  if (typeof anyV?.toDate === "function") {
    return anyV.toDate().toISOString() as T;
  }

  // Plain object timestamp { seconds, nanoseconds }
  if (typeof anyV === "object" && typeof anyV.seconds === "number") {
    const ms = anyV.seconds * 1000 + Math.floor((anyV.nanoseconds || 0) / 1e6);
    return new Date(ms).toISOString() as T;
  }

  // JS Date
  if (v instanceof Date) {
    return v.toISOString() as T;
  }

  if (Array.isArray(v)) {
    return v.map(serializeForClient) as T;
  }

  if (typeof v === "object") {
    const out: any = {};
    for (const [k, val] of Object.entries(anyV)) out[k] = serializeForClient(val);
    return out as T;
  }

  return v;
}
