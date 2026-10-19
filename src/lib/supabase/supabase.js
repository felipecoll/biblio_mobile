import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 🔍 Agrega estas líneas para depurar en la consola del navegador:
console.log('ENV URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('ENV KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);