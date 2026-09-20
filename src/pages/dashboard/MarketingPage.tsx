import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Megaphone, Ticket, LayoutTemplate, ShoppingCart, TrendingUp, Eye, MousePointer } from 'lucide-react'

export function MarketingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Marketing</h1>
        <p className="text-sm text-ink-600">Campagnes, bannières, paniers abandonnés, landing pages</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Campagnes actives</p><p className="text-[22px] font-bold mt-1">5</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Paniers abandonnés</p><p className="text-[22px] font-bold mt-1">23</p><p className="text-xs text-amber-600 mt-1">12 récupérables</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Taux conversion landing</p><p className="text-[22px] font-bold mt-1">3.8%</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +0.5%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Vues bannières</p><p className="text-[22px] font-bold mt-1">1,240</p></CardContent></Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="abandoned">Paniers abandonnés</TabsTrigger>
          <TabsTrigger value="landing">Landing Pages</TabsTrigger>
          <TabsTrigger value="banners">Bannières</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Soldes été -30%', type: 'Flash Sale', status: 'active', views: 420, conversions: 18, desc: 'Produits mode femmes, sans images humaines' },
              { name: 'Livraison offerte dès 150TND', type: 'Promotion', status: 'active', views: 890, conversions: 32, desc: 'Bannière homepage + checkout' },
              { name: 'Nouvelle collection maison', type: 'Banner', status: 'scheduled', views: 0, conversions: 0, desc: 'Lancement prévu 15/09' },
            ].map(c => (
              <Card key={c.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-[15px]">{c.name}</CardTitle>
                      <p className="text-xs text-ink-500 mt-1">{c.desc}</p>
                    </div>
                    <Badge variant={c.status === 'active' ? 'success' : 'secondary'}>{c.status === 'active' ? 'Active' : 'Planifiée'}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5 text-ink-400" /> {c.views} vues</span>
                    <span className="flex items-center gap-1"><MousePointer className="h-3.5 w-3.5 text-ink-400" /> {c.conversions} conversions</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Modifier</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Stats</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="abandoned">
          <Card>
            <CardHeader><CardTitle className="text-[16px] flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Paniers abandonnés</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                    <tr>
                      <th className="text-left p-3 font-medium">Client</th>
                      <th className="text-left p-3 font-medium">Articles</th>
                      <th className="text-left p-3 font-medium">Total</th>
                      <th className="text-left p-3 font-medium">Abandonné</th>
                      <th className="text-right p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {[
                      { phone: '+216 22 345 678', items: 2, total: 134, time: 'Il y a 1h' },
                      { phone: '+216 98 123 456', items: 1, total: 89, time: 'Il y a 3h' },
                      { phone: 'amira@exemple.tn', items: 3, total: 210, time: 'Hier' },
                    ].map((a, i) => (
                      <tr key={i} className="hover:bg-ink-50/50">
                        <td className="p-3 font-medium">{a.phone}</td>
                        <td className="p-3">{a.items}</td>
                        <td className="p-3 font-bold">{a.total} TND</td>
                        <td className="p-3 text-xs text-ink-500">{a.time}</td>
                        <td className="p-3 text-right"><Button size="sm" variant="outline" className="h-7 text-xs">Relancer</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landing">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { slug: 'ete-2026', title: 'Collection Été 2026', views: 342, conv: 12, active: true },
              { slug: 'promo-ramadan', title: 'Offres Ramadan', views: 890, conv: 34, active: true },
            ].map(lp => (
              <Card key={lp.slug}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{lp.title}</p>
                      <p className="text-xs text-ink-500 font-mono">/{lp.slug}</p>
                      <div className="flex gap-3 mt-2 text-xs text-ink-600">
                        <span>{lp.views} vues</span><span>{lp.conv} conversions</span><span>{((lp.conv/lp.views)*100).toFixed(1)}% conv</span>
                      </div>
                    </div>
                    <Badge variant={lp.active ? 'success' : 'secondary'}>{lp.active ? 'Active' : 'Brouillon'}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="banners">
          <Card>
            <CardContent className="p-12 text-center">
              <LayoutTemplate className="h-12 w-12 text-ink-300 mx-auto" />
              <p className="font-medium mt-4">Bannières promotionnelles</p>
              <p className="text-sm text-ink-500 mt-1">Gérez bannières homepage, sans images humaines - produits, packaging, illustrations abstraites</p>
              <Button size="sm" className="mt-4">Créer bannière</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
