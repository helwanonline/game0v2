import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabaseInstance = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL and/or Anon Key are not provided. Falling back to local JSON data. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables for database connectivity.");
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;
