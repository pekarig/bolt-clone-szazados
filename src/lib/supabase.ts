import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  property_number: string;
  title: string;
  floor: number;
  rooms: number;
  area: number;
  balcony: boolean;
  orientation: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  description: string;
  images: string[];
  floor_plan: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'render' | 'photo' | 'construction';
  image_url: string;
  thumbnail_url: string;
  display_order: number;
  created_at: string;
}

export interface ContactInquiry {
  id?: string;
  property_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}
