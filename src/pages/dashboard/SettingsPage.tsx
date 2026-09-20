import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { ShieldCheck, Globe, Search, Store, AlertTriangle } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Paramètres</h1>
        <p className="text-sm text-ink-600">Boutique, domaine, langue, devise, SEO - tenant-isolé</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="domain">Domaine</TabsTrigger>
          <TabsTrigger value="localization">Localisation</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle className="text-[16px]">Informations boutique</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nom boutique</Label><Input defaultValue="Boutique Élégance" /></div>
                <div className="space-y-2"><Label>Slug</Label><Input defaultValue="boutique-elegance" /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea defaultValue="Boutique de produits essentiels, qualité et durabilité. Sans superflu." /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Email contact</Label><Input defaultValue="contact@boutique-elegance.tn" /></div>
                <div className="space-y-2"><Label>Téléphone</Label><Input defaultValue="+216 22 345 678" /></div>
              </div>
              <Button>Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-[16px] flex items-center gap-2"><Store className="h-5 w-5" /> Domaines</CardTitle><CardDescription>Initial: slug.barka-domain, futur: custom domain shop-example.tn</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-ink-50 border p-4">
                  <p className="text-sm font-medium">Domaine Barka (actuel)</p>
                  <p className="text-sm font-mono mt-1">boutique-elegance.barka.tn</p>
                  <p className="text-xs text-ink-500 mt-1">Hébergé sur Cloudflare Pages, SSL automatique</p>
                </div>
                <div className="space-y-2">
                  <Label>Domaine personnalisé (futur)</Label>
                  <Input placeholder="shop-exemple.tn" />
                  <p className="text-xs text-ink-500">Configurez DNS CNAME vers Cloudflare Pages. Architecture prête pour custom domains.</p>
                </div>
                <Button variant="outline">Vérifier DNS</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/30">
              <CardContent className="p-4 flex gap-3 text-sm">
                <Globe className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900">Architecture domaine Barka</p>
                  <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">Chaque store a store_id + slug. Initialement supporte store-slug.barka-domain via Cloudflare Pages. Préparé pour custom domains (shop-example.tn) avec mapping store_id → custom_domain dans table stores. Middleware vérifie Host header et résout tenant.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="localization">
          <Card>
            <CardHeader><CardTitle className="text-[16px]">Localisation tunisienne</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Pays</Label><Select defaultValue="TN"><option value="TN">Tunisie</option></Select></div>
                <div className="space-y-2"><Label>Devise</Label><Select defaultValue="TND"><option value="TND">TND - Dinar Tunisien</option><option value="EUR">EUR</option><option value="USD">USD</option></Select></div>
                <div className="space-y-2"><Label>Langue principale</Label><Select defaultValue="fr"><option value="fr">Français</option><option value="ar">العربية (RTL)</option><option value="en">English</option></Select></div>
              </div>
              <div className="space-y-2">
                <Label>Gouvernorats supportés</Label>
                <div className="rounded-xl border border-ink-200 p-3 max-h-[120px] overflow-y-auto text-xs grid grid-cols-2 gap-1">
                  {["Tunis","Ariana","Ben Arous","Manouba","Nabeul","Zaghouan","Bizerte","Béja","Jendouba","Le Kef","Siliana","Sousse","Monastir","Mahdia","Sfax","Kairouan","Kasserine","Sidi Bouzid","Gabès","Medenine","Tataouine","Gafsa","Tozeur","Kebili"].map(g => (
                    <div key={g} className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> {g}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border">
                <div><p className="text-sm font-medium">Support RTL pour arabe</p><p className="text-xs text-ink-500">Active le mode RTL automatiquement</p></div>
                <Switch checked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader><CardTitle className="text-[16px] flex items-center gap-2"><Search className="h-5 w-5" /> SEO & Métadonnées</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>SEO Title</Label><Input defaultValue="Boutique Élégance - Produits essentiels tunisiens" /></div>
              <div className="space-y-2"><Label>SEO Description</Label><Textarea defaultValue="Découvrez notre collection de produits essentiels, qualité et durabilité. Livraison partout en Tunisie, paiement à la livraison." /></div>
              <div className="space-y-2"><Label>Mots-clés</Label><Input defaultValue="mode tunisie, boutique en ligne, livraison tunisie, COD" /></div>
              <div className="rounded-xl bg-ink-50 border p-3 text-xs">
                <p className="font-medium">Aperçu Google</p>
                <p className="text-blue-600 mt-1">Boutique Élégance - Produits essentiels tunisiens</p>
                <p className="text-emerald-700">https://boutique-elegance.barka.tn</p>
                <p className="text-ink-600 mt-1">Découvrez notre collection de produits essentiels...</p>
              </div>
              <Button>Sauvegarder SEO</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle className="text-[16px] flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Sécurité & RLS</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <p className="font-semibold text-emerald-900">Tenant isolation active</p>
                <p className="text-emerald-700/80 text-xs mt-1 leading-relaxed">Toutes les tables ont RLS activé. Politique: is_store_member(store_id) vérifie que user_id = auth.uid() est membre du store. Aucun marchand ne peut accéder aux données d'un autre.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl border"><div><p className="font-medium">Authentification 2FA</p><p className="text-xs text-ink-500">Pour comptes admin</p></div><Switch /></div>
                <div className="flex items-center justify-between p-3 rounded-xl border"><div><p className="font-medium">Logs d'audit</p><p className="text-xs text-ink-500">Suivi actions sensibles</p></div><Switch checked /></div>
                <div className="flex items-center justify-between p-3 rounded-xl border"><div><p className="font-medium">Session persistence</p><p className="text-xs text-ink-500">Supabase Auth auto-refresh</p></div><Switch checked /></div>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-2 text-xs text-amber-800">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <p>Ne jamais exposer service-role credentials en frontend. Utilisez Edge Functions pour opérations sensibles (Meta CAPI, delivery, order creation).</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
