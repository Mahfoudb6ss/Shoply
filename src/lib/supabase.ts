import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hasPublicSupabaseCreds = Boolean(rawSupabaseUrl && rawSupabaseAnonKey);

const supabaseUrl = rawSupabaseUrl ?? "https://placeholder.supabase.co";
const supabaseAnonKey = rawSupabaseAnonKey ?? "public-anon-key";

if (!hasPublicSupabaseCreds) {
  console.warn(
    "Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
  );
}

export const supabaseServer = () =>
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });

export const supabaseService = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawSupabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service credentials are required for privileged calls");
  }

  return createClient(rawSupabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });
};

