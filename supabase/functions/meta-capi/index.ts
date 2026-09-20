// Barka Edge Function: meta-capi
// Secure server-side Meta Conversions API proxy
// Never expose access token to frontend

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
    const { store_id, event_name, event_id, event_source_url, user_data, custom_data } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Meta integration (secure, service role)
    const { data: integration, error } = await supabaseClient
      .from('meta_integrations')
      .select('pixel_id, dataset_id, access_token_encrypted, test_event_code, is_active')
      .eq('store_id', store_id)
      .single()

    if (error || !integration || !integration.is_active) {
      throw new Error('Meta integration not configured')
    }

    // Decrypt access token (in production, use Supabase Vault or KMS)
    // For demo: assume token is stored encrypted and decrypted here
    const accessToken = integration.access_token_encrypted // decrypt in real impl

    if (!accessToken) throw new Error('Access token missing')

    const datasetId = integration.dataset_id || integration.pixel_id

    // Build CAPI payload
    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          event_source_url,
          action_source: 'website',
          user_data: {
            // Hashing should happen here server-side with SHA-256
            // em: await hashSHA256(user_data.email),
            // ph: await hashSHA256(user_data.phone),
            ...user_data,
            client_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
            client_user_agent: req.headers.get('user-agent'),
          },
          custom_data,
        }
      ],
      test_event_code: integration.test_event_code || undefined,
    }

    // Send to Meta
    const metaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${datasetId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const result = await metaResponse.json()

    // Log event
    await supabaseClient.from('meta_events').insert({
      store_id,
      event_name,
      event_id,
      user_data,
      custom_data,
      status: metaResponse.ok ? 'sent' : 'failed',
      response: result,
    })

    return new Response(JSON.stringify({ success: true, result }), {
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
