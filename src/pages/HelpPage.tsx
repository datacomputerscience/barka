import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarkaLogo } from '@/components/layout/BarkaLogo'
import { Book, ShieldCheck, Package, Truck, Code, Database, Globe } from 'lucide-react'
import { Facebook } from '@/components/icons'

export function HelpPage() {
  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <header className="h-[64px] bg-white border-b border-ink-100 px-6 flex items-center justify-between">
        <BarkaLogo size="sm" />
        <Badge variant="secondary">Documentation v1.0</Badge>
      </header>

      <div className="mx-auto max-w-[900px] px-6 py-10 space-y-8">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight font-display">Documentation Barka</h1>
          <p className="text-ink-600 mt-2">Plateforme e-commerce SaaS multi-tenant pour la Tunisie - Architecture & Guide</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card><CardContent className="p-5"><div className="h-10 w-10 rounded-xl bg-barka-50 text-barka-700 flex items-center justify-center mb-3"><Package className="h-5 w-5" /></div><p className="font-semibold">Produits objet-only</p><p className="text-xs text-ink-600 mt-1 leading-relaxed">Pas de modèles humains. Photos sur fond neutre, cintre, flat lay. Ex: "Robe photographiée sur cintre fond blanc" pas "femme portant robe".</p></CardContent></Card>
          <Card><CardContent className="p-5"><div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3"><ShieldCheck className="h-5 w-5" /></div><p className="font-semibold">RLS & Tenant Isolation</p><p className="text-xs text-ink-600 mt-1 leading-relaxed">Chaque table a store_id + RLS. Fonction is_store_member() vérifie appartenance. Aucune fuite inter-marchands.</p></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-[18px] flex items-center gap-2"><Database className="h-5 w-5" /> Schéma Base de Données</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-semibold">Tables principales (25+):</p>
                <ul className="mt-2 space-y-1 text-ink-600 font-mono">
                  <li>• profiles, stores, store_members</li>
                  <li>• products, product_variants, categories</li>
                  <li>• inventory, inventory_movements</li>
                  <li>• customers, orders, order_items</li>
                  <li>• order_status_history</li>
                  <li>• delivery_providers, shipments</li>
                  <li>• coupons, coupon_usages, campaigns</li>
                  <li>• landing_pages, abandoned_carts</li>
                  <li>• analytics_events, meta_integrations, meta_events</li>
                  <li>• media, notifications, audit_logs</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Fonctionnalités DB:</p>
                <ul className="mt-2 space-y-1 text-ink-600">
                  <li>• UUID PKs, created_at/updated_at</li>
                  <li>• FKs, indexes, unique constraints</li>
                  <li>• RLS policies sur toutes tables tenant</li>
                  <li>• Triggers updated_at, order_number</li>
                  <li>• RPC decrement_stock() avec FOR UPDATE</li>
                  <li>• Storage buckets: product-images, store-assets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-[18px] flex items-center gap-2"><Truck className="h-5 w-5" /> Livraison - Architecture Extensible</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <pre className="bg-ink-950 text-white p-4 rounded-xl text-xs overflow-x-auto">
{`interface DeliveryProvider {
  createShipment(order): Promise<{tracking_number, response}>
  getShipment(tracking_number): Promise<Shipment>
  trackShipment(tracking_number): Promise<{status, history}>
  cancelShipment(tracking_number): Promise<boolean>
  calculateDeliveryFee(params): Promise<number>
  validateCredentials(creds): Promise<boolean>
}

// Tunisian providers: MesColis, Aramex, First Delivery, Best Delivery, Navex, INTIGO
// MockDeliveryProvider for dev - real only with official API docs
// Credentials encrypted server-side, never frontend`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-[18px] flex items-center gap-2"><Facebook className="h-5 w-5 text-blue-600" /> Meta - Pixel + CAPI</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="font-semibold text-blue-900">Deduplication event_id</p>
              <p className="text-blue-700/80 text-xs mt-1">Même event_id pour Pixel browser + CAPI server. Meta déduplique via event_id + event_name.</p>
              <pre className="mt-3 bg-white border rounded-lg p-3 text-[11px] font-mono">
{`// Browser
fbq('track', 'Purchase', {value: 149, currency: 'TND'}, {eventID: '171...abc'})

// Server (Edge Function)
{
  event_name: 'Purchase',
  event_id: '171...abc', // même ID
  user_data: {em: hash(email), ph: hash(phone)},
  custom_data: {value: 149, currency: 'TND'}
}`}
              </pre>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div><p className="font-semibold">Événements:</p><p className="text-ink-600 mt-1">PageView, ViewContent, Search, AddToCart, InitiateCheckout, Purchase, AddPaymentInfo, Lead</p></div>
              <div><p className="font-semibold">Flux catalogue:</p><p className="text-ink-600 mt-1">/api/feed/meta - id, title, description, availability, price, link, image_link, brand - tenant-isolé, cache 1h</p></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-[18px] flex items-center gap-2"><Code className="h-5 w-5" /> Checkout COD - Flux Sécurisé</CardTitle></CardHeader>
          <CardContent className="text-xs leading-relaxed space-y-2">
            <p>1. Validation panier serveur • 2. Vérif stock & prix DB (jamais trust browser) • 3. Calcul sous-total/remise/livraison serveur • 4. Création order + order_items • 5. Update inventory sécurisé (FOR UPDATE) • 6. Historique status • 7. Analytics • 8. Meta Purchase event avec event_id • 9. Confirmation</p>
            <p className="font-semibold mt-3">Champs checkout tunisien:</p>
            <p>Prénom, nom, téléphone (validation TN), email optionnel, gouvernorat (24), ville, délégation, adresse, info additionnelle. Paiement COD first-class. Statuts: pending → confirmed → preparing → shipped → out_for_delivery → delivered / cancelled / returned / failed + history.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-[18px] flex items-center gap-2"><Globe className="h-5 w-5" /> i18n & Localisation</CardTitle></CardHeader>
          <CardContent className="text-xs space-y-2">
            <p>• Langues: AR (RTL), FR (LTR), EN (LTR) - système i18n complet, pas hard-coded</p>
            <p>• Devise: TND par défaut, support EUR/USD</p>
            <p>• 24 gouvernorats: Tunis, Ariana, Ben Arous, Manouba, Nabeul, Zaghouan, Bizerte, Béja, Jendouba, Le Kef, Siliana, Sousse, Monastir, Mahdia, Sfax, Kairouan, Kasserine, Sidi Bouzid, Gabès, Medenine, Tataouine, Gafsa, Tozeur, Kebili</p>
            <p>• Architecture extensible pour villes/délégations</p>
          </CardContent>
        </Card>

        <Card className="bg-ink-950 text-white border-ink-800">
          <CardContent className="p-6">
            <p className="font-bold flex items-center gap-2"><Book className="h-5 w-5" /> Déploiement</p>
            <div className="mt-4 space-y-3 text-xs font-mono">
              <div><p className="text-ink-400"># Supabase</p><p>supabase link --project-ref YOUR_REF</p><p>psql -f supabase-schema.sql</p><p>supabase functions deploy create-order</p><p>supabase functions deploy meta-capi</p></div>
              <div className="mt-4"><p className="text-ink-400"># Cloudflare Pages</p><p>Build: npm run build</p><p>Output: dist</p><p>Env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
