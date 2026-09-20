/**
 * Barka Meta Integration - Pixel & Conversions API
 * Implements Meta Pixel browser events + CAPI server-side deduplication
 */

export type MetaEventName = 
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'AddPaymentInfo'
  | 'Lead'
  | 'CompleteRegistration'

export type MetaUserData = {
  em?: string // hashed email
  ph?: string // hashed phone
  fn?: string // hashed first name
  ln?: string // hashed last name
  ct?: string // city
  st?: string // state/governorate
  country?: string
  external_id?: string
  client_ip_address?: string
  client_user_agent?: string
  fbc?: string
  fbp?: string
}

export type MetaCustomData = {
  value?: number
  currency?: string
  content_ids?: string[]
  content_type?: string
  content_name?: string
  content_category?: string
  contents?: Array<{ id: string; quantity: number; item_price?: number }>
  num_items?: number
  search_string?: string
  status?: boolean
}

export type MetaEvent = {
  event_name: MetaEventName
  event_time: number
  event_id: string
  event_source_url?: string
  action_source: 'website' | 'app' | 'phone' | 'business_messaging' | 'messaging' | 'other'
  user_data: MetaUserData
  custom_data?: MetaCustomData
  data_processing_options?: string[]
}

export type MetaIntegration = {
  id: string
  store_id: string
  pixel_id: string | null
  dataset_id: string | null
  catalog_id: string | null
  access_token_encrypted: string | null // NEVER expose to frontend
  test_event_code: string | null
  is_active: boolean
  events_enabled: MetaEventName[]
  created_at: string
  updated_at: string
}

/**
 * Generate unique event_id for deduplication between Pixel and CAPI
 * Same event_id must be used for browser + server event
 */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
}

/**
 * Browser Pixel event - safe to call from frontend
 * Requires window.fbq to be loaded
 */
export function trackPixelEvent(
  eventName: MetaEventName,
  customData?: MetaCustomData,
  eventId?: string
) {
  if (typeof window === 'undefined') return
  
  const fbq = (window as any).fbq
  if (!fbq) {
    console.warn('[Barka Meta] Pixel not loaded, event queued:', eventName)
    return
  }

  const eid = eventId || generateEventId()
  
  try {
    fbq('track', eventName, customData || {}, { eventID: eid })
    console.log(`[Barka Meta] Pixel event: ${eventName}`, { eventId: eid, customData })
    return eid
  } catch (e) {
    console.error('[Barka Meta] Pixel tracking error', e)
    return eid
  }
}

/**
 * Hash function for CAPI user data (SHA-256)
 * In production, this hashing must happen server-side
 */
export async function hashSHA256(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase()
  const encoder = new TextEncoder()
  const data = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Build CAPI event payload - must be sent from secure backend (Edge Function)
 */
export function buildCAPIEvent(params: {
  event_name: MetaEventName
  event_id: string
  event_time?: number
  event_source_url: string
  user_data: MetaUserData
  custom_data?: MetaCustomData
  test_event_code?: string
}): any {
  return {
    data: [
      {
        event_name: params.event_name,
        event_time: params.event_time || Math.floor(Date.now() / 1000),
        event_id: params.event_id,
        event_source_url: params.event_source_url,
        action_source: 'website',
        user_data: params.user_data,
        custom_data: params.custom_data,
      }
    ],
    test_event_code: params.test_event_code,
  }
}

/**
 * Product Feed generation for Meta Catalog
 */
export type MetaProductFeedItem = {
  id: string
  title: string
  description: string
  availability: 'in stock' | 'out of stock' | 'preorder' | 'available for order' | 'discontinued'
  condition: 'new' | 'refurbished' | 'used'
  price: string // e.g. "99.000 TND"
  link: string
  image_link: string
  additional_image_link?: string
  brand?: string
  product_type?: string
  google_product_category?: string
  sale_price?: string
  sale_price_effective_date?: string
}

export function generateProductFeed(
  products: Array<{
    id: string
    name: string
    description: string | null
    price: number
    compare_at_price: number | null
    stock_quantity: number
    images: string[]
    slug: string
  }>,
  storeDomain: string
): MetaProductFeedItem[] {
  return products.map(p => ({
    id: p.id,
    title: p.name,
    description: p.description || p.name,
    availability: p.stock_quantity > 0 ? 'in stock' : 'out of stock',
    condition: 'new',
    price: `${p.price.toFixed(3)} TND`,
    link: `https://${storeDomain}/products/${p.slug}`,
    image_link: p.images[0] || `https://${storeDomain}/placeholder-product.png`,
    additional_image_link: p.images[1],
    brand: 'Barka Store',
    sale_price: p.compare_at_price && p.compare_at_price > p.price 
      ? `${p.price.toFixed(3)} TND` 
      : undefined,
  }))
}

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}
