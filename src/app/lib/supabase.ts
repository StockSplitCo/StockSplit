import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TokenRecord {
  id: string;
  created_at: string;
  token_address: string;
  token_name: string;
  token_symbol: string;
  creator_address: string;
} 