import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Globe, FileText, Check } from 'lucide-react'

export function SEOPage() {
  return (
    <div className="space-y-6 max-w-[800px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">SEO & Référencement</h1>
        <p className="text-sm text-ink-600">Optimisation SEO par boutique, tenant-isolé</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[16px] flex items-center gap-2"><Search className="h-5 w-5" /> Métadonnées boutique</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Title (60 caractères)</Label><Input defaultValue="Boutique Élégance - Produits essentiels | Barka" /></div>
          <div className="space-y-2"><Label>Description (160 caractères)</Label><Textarea defaultValue="Découvrez notre collection de produits essentiels, qualité et durabilité. Livraison partout en Tunisie, paiement à la livraison. Propulsé par Barka." /></div>
          <div className="space-y-2"><Label>Mots-clés</Label><Input defaultValue="boutique tunisie, mode tunisienne, livraison tunisie, paiement à la livraison" /></div>
          <div className="rounded-xl bg-ink-50 border p-4">
            <p className="text-xs font-medium">Aperçu Google</p>
            <p className="text-sm text-blue-600 mt-1">Boutique Élégance - Produits essentiels | Barka</p>
            <p className="text-xs text-emerald-700">https://boutique-elegance.barka.tn</p>
            <p className="text-xs text-ink-600 mt-1">Découvrez notre collection de produits essentiels, qualité et durabilité...</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><FileText className="h-4 w-4" /> Sitemap & Robots</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between"><span>Sitemap</span><span className="font-mono">/sitemap.xml</span></div>
            <div className="flex justify-between"><span>Robots</span><span className="font-mono">/robots.txt</span></div>
            <div className="flex justify-between"><span>Produits indexés</span><span className="font-bold">124</span></div>
            <Button variant="outline" size="sm" className="w-full mt-2">Générer sitemap</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><Globe className="h-4 w-4" /> Open Graph</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2"><Label>OG Image</Label><Input placeholder="https://..." /></div>
            <div className="rounded-xl bg-sand-50 border p-3">
              <p className="text-xs font-medium">Aperçu partage</p>
              <div className="mt-2 h-20 rounded-lg bg-white border flex items-center justify-center text-xs text-ink-400">Image produit / packaging - pas humain</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-200 bg-emerald-50/30">
        <CardContent className="p-4 flex gap-3 text-sm">
          <Check className="h-5 w-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900">SEO-friendly storefront Barka</p>
            <p className="text-emerald-700/80 text-xs mt-1 leading-relaxed">SSR-ready architecture (Cloudflare Pages Functions), meta tags dynamiques par produit/catégorie, URLs propres /products/:slug, /categories/:slug, sitemap auto-généré depuis DB, tenant-isolé. Mobile-first pour Tunisie.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
