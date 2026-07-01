import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing in environment variables.');
}

console.log('--- DEBUG INFO ---');
console.log('Supabase URL loaded:', supabaseUrl ? 'Yes' : 'No', supabaseUrl);
console.log('Supabase Key loaded:', supabaseAnonKey ? 'Yes (Length: ' + supabaseAnonKey.length + ')' : 'No');
console.log('------------------');

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Types for the Database
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_alt: string;
  tags: string[];
  author: string;
  reading_time: number;
  is_published: boolean;
  canonical_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};
