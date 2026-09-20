import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { LayoutTemplate, Plus, Eye, MousePointer, TrendingUp, Edit } from 'lucide-react'

const pages = [
  { id: '1', slug: 'ete-2026', title: 'Collection Été 2026 - L\'essentiel bien fait', views: 1240, conversions: 42, rate: 3.4, active: true, created: 'Il y a 3j' },
  { id: '2', slug: 'promo-ramadan', title: 'Offres Ramadan - Livraison offerte', views: 890, conversions: 34, rate: 3.8, active: true, created: 'Il y a 1 sem' },
  { id: '3', slug: 'black-friday', title: 'Black Friday - Jusqu\'à -50%', views: 0, conversions: 0, rate: 0, active: false, created: 'Brouillon' },
]

export function LandingPagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Landing Pages</h1>
          <p className="text-sm text-ink-600">Pages d'atterrissage optimisées conversion, sans images humaines</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Nouvelle landing page</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Total vues</p><p className="text-[22px] font-bold mt-1">2,130</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +12% cette semaine</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Conversions</p><p className="text-[22px] font-bold mt-1">76</p><p className="text-xs text-ink-400 mt-1">Taux moyen 3.6%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Pages actives</p><p className="text-[22px] font-bold mt-1">2</p><p className="text-xs text-ink-400 mt-1">Sur 3 totales</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <Input placeholder="Rechercher landing page..." />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {pages.map(page => (
          <Card key={page.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-xl bg-sand-50 border flex items-center justify-center shrink-0">
                    <LayoutTemplate className="h-8 w-8 text-sand-800/50" />
                  </div>
                  <div>
                    <p className="font-semibold">{page.title}</p>
                    <p className="text-xs font-mono text-ink-500 mt-1">/{page.slug} • Créé {page.created}</p>
                    <div className="flex gap-4 mt-2 text-xs text-ink-600">
                      <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {page.views} vues</span>
                      <span className="flex items-center gap-1"><MousePointer className="h-3.5 w-3.5" /> {page.conversions} conv</span>
                      <span className="font-bold text-barka-600">{page.rate}% taux</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={page.active ? 'success' : 'secondary'}>{page.active ? 'Active' : 'Brouillon'}</Badge>
                  <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> Aperçu</Button>
                  <Button variant="outline" size="sm"><Edit className="h-4 w-4" /> Modifier</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader><CardTitle className="text-[14px]">Builder landing page Barka</CardTitle></CardHeader>
        <CardContent className="text-xs leading-relaxed text-ink-600 space-y-2">
          <p>• Sections: hero (produit/packaging pas humain), featured products, catégories, offres, témoignages texte, FAQ</p>
          <p>• Optimisé conversion: CTA clair, preuve sociale, livraison info</p>
          <p>• SEO: seo_title, seo_description par landing page</p>
          <p>• Tracking: Meta Pixel ViewContent + analytics_events</p>
          <p>• Sans images humaines - respect politique Barka</p>
        </CardContent>
      </Card>
    </div>
  )
}
