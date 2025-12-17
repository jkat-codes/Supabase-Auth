import { createClient } from '@supabase/supabase-js'; 

// Connects to the supabase database

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing supabase environment variables! Check your local .env file.'
    ); 
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 