// Barka Edge Function: product-feed
// Dynamic Meta product feed - tenant-isolated, cache 1h
// Generates CSV/XML for Facebook Catalog

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const slug = url.searchParams.get('slug')
    const format = url.searchParams.get('format') || 'csv'

    if (!slug) throw new Error('Missing store slug')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Resolve store by slug
    const { data: store, error: storeError } = await supabaseClient
      .from('stores')
      .select('id, slug, domain, custom_domain')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (storeError || !store) throw new Error('Store not found')

    // Get active products
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('id, name, description, price, compare_at_price, stock_quantity, images, slug')
      .eq('store_id', store.id)
      .eq('status', 'active')

    if (productsError) throw productsError

    const domain = store.custom_domain || store.domain || `${store.slug}.barka.tn`

    // Generate feed items
    const feedItems = products.map(p => ({
      id: p.id,
      title: p.name,
      description: p.description || p.name,
      availability: p.stock_quantity > 0 ? 'in stock' : 'out of stock',
      condition: 'new',
      price: `${p.price.toFixed(3)} TND`,
      link: `https://${domain}/products/${p.slug}`,
      image_link: p.images?.[0] || `https://${domain}/placeholder.png`,
      brand: store.slug,
      product_type: 'General',
      sale_price: p.compare_at_price && p.compare_at_price > p.price ? `${p.price.toFixed(3)} TND` : undefined,
    }))

    if (format === 'csv') {
      const headers = ['id','title','description','availability','condition','price','link','image_link','brand']
      const csvRows = [headers.join(',')]
      for (const item of feedItems) {
        const row = headers.map(h => {
          const val = (item as any)[h] || ''
          // Escape CSV
          return `"${String(val).replace(/"/g, '""')}"`
        }).join(',')
        csvRows.push(row)
      }
      const csv = csvRows.join('\n')

      return new Response(csv, {
        headers: { ...corsHeaders, 'Content-Type': 'text/csv', 'Cache-Control': 'public, max-age=3600' },
        status: 200,
      })
    } else {
      // JSON
      return new Response(JSON.stringify(feedItems), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
        status: 200,
      })
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
