// Server-side Supabase client. This file must only be imported from server
// code (route handlers, server components). Do NOT import it from a Client
// Component — the anon key is public but we keep the usage pattern clean.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

// Server-side client. Uses the anon key; inserts to sms_consents are
// permitted by RLS policy (see migration). No session persistence — each
// request is a fresh stateless write.
export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
