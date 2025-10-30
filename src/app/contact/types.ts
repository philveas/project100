export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;                     // required to avoid optional mismatch
  success?: boolean;                   // keep if you like this flag
  errors?: Record<string, string[]>;   // matches zod .flatten().fieldErrors
};
