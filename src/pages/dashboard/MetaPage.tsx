import { Facebook } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Check, AlertTriangle, Code, ShieldCheck, Zap } from 'lucide-react'

export function MetaPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center"><Facebook className="h-5 w-5" /></div>
          Intégration Meta
        </h1>
        <p className="text-sm text-ink-600 mt-1">Pixel + Conversions API + Catalogue - votre moteur de croissance #1</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-emerald-700"><Check className="h-4 w-4" /><span className="text-sm font-bold">Pixel actif</span></div>
            <p className="text-xs text-emerald-700/80 mt-1">ID: 123456789012345</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-700"><AlertTriangle className="h-4 w-4" /><span className="text-sm font-bold">CAPI à configurer</span></div>
            <p className="text-xs text-amber-700/80 mt-1">Recommandé pour iOS14+</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700"><Zap className="h-4 w-4" /><span className="text-sm font-bold">Catalogue: 124 produits</span></div>
            <p className="text-xs text-blue-700/80 mt-1">Flux: /api/feed/meta</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">Configuration Pixel & CAPI</CardTitle>
            <CardDescription>Credentials sécurisés, jamais exposés frontend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Pixel ID</Label>
              <Input placeholder="123456789012345" defaultValue="123456789012345" />
              <p className="text-xs text-ink-500">Trouvé dans Events Manager → Data Sources</p>
            </div>
            <div className="space-y-2">
              <Label>Dataset ID (pour CAPI)</Label>
              <Input placeholder="123456789012345" />
            </div>
            <div className="space-y-2">
              <Label>Catalog ID</Label>
              <Input placeholder="123456789012345" />
            </div>
            <div className="space-y-2">
              <Label>Access Token CAPI (serveur uniquement)</Label>
              <Input type="password" placeholder="EAA..." />
              <p className="text-xs text-amber-700 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Chiffré côté serveur, jamais envoyé au navigateur</p>
            </div>
            <div className="space-y-2">
              <Label>Test Event Code (optionnel)</Label>
              <Input placeholder="TEST12345" />
            </div>
            <Button className="w-full">Sauvegarder configuration sécurisée</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Événements trackés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { event: 'PageView', desc: 'Chaque page vue', enabled: true },
                { event: 'ViewContent', desc: 'Page produit', enabled: true },
                { event: 'Search', desc: 'Recherche', enabled: true },
                { event: 'AddToCart', desc: 'Ajout panier', enabled: true },
                { event: 'InitiateCheckout', desc: 'Début checkout', enabled: true },
                { event: 'Purchase', desc: 'Achat + CAPI deduplication', enabled: true, highlight: true },
              ].map(e => (
                <div key={e.event} className={`flex items-center justify-between p-3 rounded-xl border ${e.highlight ? 'bg-blue-50 border-blue-200' : 'bg-ink-50 border-ink-100'}`}>
                  <div>
                    <p className="text-sm font-mono font-bold">{e.event}</p>
                    <p className="text-xs text-ink-500">{e.desc}</p>
                  </div>
                  <Badge variant={e.enabled ? 'success' : 'secondary'}>{e.enabled ? 'Actif' : 'Inactif'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-ink-950 text-white border-ink-800">
            <CardHeader>
              <CardTitle className="text-[14px] flex items-center gap-2"><Code className="h-4 w-4" /> Exemple déduplication</CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-xs leading-relaxed space-y-2">
              <div className="text-ink-300">// Browser Pixel</div>
              <div>fbq('track', 'Purchase', {'{'} value: 149, currency: 'TND {'}'},</div>
              <div className="text-emerald-400">{'{'} eventID: '171...abc' {'}'}) // même ID</div>
              <div className="mt-3 text-ink-300">// Server CAPI (Edge Function)</div>
              <div>{'{'} event_name: 'Purchase', event_id: '171...abc',</div>
              <div>  user_data: {'{'} em: hash(email) {'}'}, custom_data: {'{'} value {'}'} {'}'}</div>
              <div className="text-ink-400 mt-2">// Meta déduplique via event_id + event_name</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[16px]">Flux catalogue Meta</CardTitle>
          <CardDescription>URL dynamique pour Facebook Catalog</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl bg-ink-50 border p-3 font-mono text-sm">
            https://boutique-elegance.barka.tn/api/feed/meta?format=csv
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-semibold mb-2">Champs inclus (standard Meta):</p>
              <ul className="space-y-1 text-ink-600">
                <li>• id, title, description</li>
                <li>• availability, condition, price</li>
                <li>• link, image_link, brand</li>
                <li>• product_type, sale_price</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Sécurité:</p>
              <ul className="space-y-1 text-ink-600">
                <li>• Généré dynamiquement depuis vos produits</li>
                <li>• Tenant-isolé par store_id</li>
                <li>• Cache 1h pour performance</li>
                <li>• Prêt pour Facebook Commerce Manager</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Prévisualiser flux</Button>
            <Button variant="outline" size="sm">Copier URL</Button>
            <Button size="sm">Tester dans Events Manager</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
