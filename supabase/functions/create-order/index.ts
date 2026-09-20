// Barka Edge Function: create-order
// Server-side order validation - NEVER trust browser totals
// Deno runtime for Supabase Edge Functions

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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { store_id, items, customer, coupon_code, delivery_fee: clientDeliveryFee, event_id } = await req.json()

    // 1. Validate store exists and is active
    const { data: store, error: storeError } = await supabaseClient
      .from('stores')
      .select('id, currency')
      .eq('id', store_id)
      .eq('status', 'active')
      .single()

    if (storeError || !store) throw new Error('Store not found or inactive')

    // 2. Validate products & get current prices from DB (NEVER trust client prices)
    let subtotal = 0
    const orderItems = []
    
    for (const item of items) {
      const { data: product, error } = await supabaseClient
        .from('products')
        .select('id, name, sku, price, stock_quantity, status')
        .eq('id', item.product_id)
        .eq('store_id', store_id)
        .single()

      if (error || !product) throw new Error(`Product ${item.product_id} not found`)
      if (product.status !== 'active') throw new Error(`Product ${product.name} not active`)
      if (product.stock_quantity < item.quantity) throw new Error(`Insufficient stock for ${product.name}`)

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_sku: product.sku,
        quantity: item.quantity,
        unit_price: product.price,
        total_price: itemTotal,
        store_id,
      })
    }

    // 3. Calculate discounts server-side
    let discountTotal = 0
    if (coupon_code) {
      const { data: coupon } = await supabaseClient
        .from('coupons')
        .select('*')
        .eq('store_id', store_id)
        .eq('code', coupon_code)
        .eq('is_active', true)
        .single()

      if (coupon) {
        if (coupon.type === 'percentage') {
          discountTotal = subtotal * (coupon.value / 100)
          if (coupon.max_discount_amount) discountTotal = Math.min(discountTotal, coupon.max_discount_amount)
        } else if (coupon.type === 'fixed') {
          discountTotal = coupon.value
        }
      }
    }

    // 4. Calculate delivery fee server-side (by governorate)
    const { data: deliveryConfig } = await supabaseClient
      .from('delivery_configs')
      .select('fee')
      .eq('store_id', store_id)
      .eq('governorate', customer.governorate)
      .eq('is_active', true)
      .maybeSingle()

    const deliveryFee = deliveryConfig?.fee ?? 8 // default

    const total = subtotal - discountTotal + deliveryFee

    // 5. Create customer if not exists
    let customerId = null
    const { data: existingCustomer } = await supabaseClient
      .from('customers')
      .select('id')
      .eq('store_id', store_id)
      .eq('phone', customer.phone)
      .maybeSingle()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer, error: custError } = await supabaseClient
        .from('customers')
        .insert({
          store_id,
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone,
          email: customer.email,
          governorate: customer.governorate,
          city: customer.city,
          address: customer.address,
        })
        .select('id')
        .single()

      if (!custError) customerId = newCustomer.id
    }

    // 6. Create order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        store_id,
        customer_id: customerId,
        status: 'pending',
        payment_method: 'cod',
        payment_status: 'pending',
        subtotal,
        discount_total: discountTotal,
        delivery_fee: deliveryFee,
        total,
        currency: store.currency,
        customer_first_name: customer.first_name,
        customer_last_name: customer.last_name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        governorate: customer.governorate,
        city: customer.city,
        delegation: customer.delegation,
        address: customer.address,
        additional_info: customer.additional_info,
        coupon_code,
        meta_event_id: event_id,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // 7. Create order items
    const itemsWithOrder = orderItems.map(i => ({ ...i, order_id: order.id }))
    const { error: itemsError } = await supabaseClient.from('order_items').insert(itemsWithOrder)
    if (itemsError) throw itemsError

    // 8. Update inventory safely (decrement stock)
    for (const item of items) {
      const { data: success } = await supabaseClient.rpc('decrement_stock', {
        product_uuid: item.product_id,
        qty: item.quantity,
      })
      if (!success) throw new Error(`Failed to decrement stock for ${item.product_id}`)
    }

    // 9. Create status history
    await supabaseClient.from('order_status_history').insert({
      order_id: order.id,
      store_id,
      to_status: 'pending',
      notes: 'Order created via storefront',
    })

    // 10. Record analytics
    await supabaseClient.from('analytics_events').insert({
      store_id,
      event_type: 'purchase',
      order_id: order.id,
      customer_id: customerId,
      metadata: { total, items: items.length, governorate: customer.governorate },
    })

    // 11. Trigger Meta CAPI Purchase (via separate function call)
    // This would call meta-capi function with event_id for deduplication
    // await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/meta-capi`, {...})

    return new Response(JSON.stringify({ success: true, order }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
