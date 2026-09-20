import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
}

// Types for Barka
export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'SUPER_ADMIN' | 'STORE_OWNER' | 'STORE_ADMIN' | 'STORE_MANAGER' | 'STORE_EDITOR' | 'CUSTOMER'
  created_at: string
  updated_at: string
}

export type Store = {
  id: string
  owner_id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  favicon_url: string | null
  domain: string | null
  custom_domain: string | null
  language: 'ar' | 'fr' | 'en'
  currency: string
  status: 'active' | 'inactive' | 'suspended'
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  store_id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  sku: string | null
  price: number
  compare_at_price: number | null
  cost_price: number | null
  stock_quantity: number
  low_stock_threshold: number
  weight: number | null
  status: 'draft' | 'active' | 'out_of_stock' | 'archived'
  is_featured: boolean
  is_digital: boolean
  images: string[]
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  store_id: string
  order_number: string
  customer_id: string | null
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned' | 'failed'
  payment_method: 'cod'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  subtotal: number
  discount_total: number
  delivery_fee: number
  total: number
  currency: string
  customer_first_name: string
  customer_last_name: string
  customer_phone: string
  customer_email: string | null
  governorate: string
  city: string
  delegation: string | null
  address: string
  additional_info: string | null
  coupon_code: string | null
  created_at: string
  updated_at: string
}
