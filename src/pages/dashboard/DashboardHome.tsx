import { Facebook } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatTND } from '@/lib/utils'
import { 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  Users, 
  ArrowUpRight,
  Truck,
  AlertTriangle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts'

const revenueData = [
  { name: 'Lun', revenue: 420 },
  { name: 'Mar', revenue: 380 },
  { name: 'Mer', revenue: 620 },
  { name: 'Jeu', revenue: 540 },
  { name: 'Ven', revenue: 890 },
  { name: 'Sam', revenue: 1020 },
  { name: 'Dim', revenue: 760 },
]

const topProducts = [
  { name: 'Robe lin - beige', sales: 24, revenue: 2136, stock: 12 },
  { name: 'Smartphone stand aluminium', sales: 18, revenue: 540, stock: 3 },
  { name: 'Sac tote coton bio', sales: 15, revenue: 675, stock: 28 },
]

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-ink-600 mt-1">Bienvenue, voici ce qui se passe aujourd'hui</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exporter</Button>
          <Button size="sm">Nouveau produit</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Revenu total', value: formatTND(4520.5), change: '+12.5%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
          { title: 'Commandes', value: '48', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
          { title: 'Produits actifs', value: '124', change: '+3', icon: Package, color: 'text-purple-600 bg-purple-50' },
          { title: 'Clients', value: '312', change: '+18', icon: Users, color: 'text-amber-600 bg-amber-50' },
        ].map(kpi => (
          <Card key={kpi.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-xl ${kpi.color} flex items-center justify-center`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" /> {kpi.change}
                </Badge>
              </div>
              <p className="mt-4 text-sm text-ink-500">{kpi.title}</p>
              <p className="text-[22px] font-bold tracking-tight">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[16px]">Revenus - 7 derniers jours</CardTitle>
            <Badge variant="secondary">TND</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8f8f9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="revenue" fill="#0d9f4a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">Alertes & actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900">3 produits en rupture imminente</p>
                <p className="text-xs text-amber-700 mt-1">Smartphone stand - stock: 3 unités</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white">Réapprovisionner</Button>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 flex gap-3">
              <Facebook className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Meta CAPI non configuré</p>
                <p className="text-xs text-blue-700 mt-1">Activez pour +23% tracking estimé</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white">Configurer</Button>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex gap-3">
              <Truck className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-900">12 commandes à expédier</p>
                <p className="text-xs text-emerald-700 mt-1">Dont 4 en attente depuis hier</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white">Voir commandes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[16px]">Top produits</CardTitle>
            <Button variant="ghost" size="sm">Voir tout</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map(p => (
                <div key={p.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-ink-50 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-sand-100 border border-sand-200 flex items-center justify-center">
                    <Package className="h-6 w-6 text-sand-800/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.sales} ventes • Stock: {p.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatTND(p.revenue)}</p>
                    {p.stock < 5 && <Badge variant="warning" className="mt-1">Stock faible</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">Entonnoir de conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Visiteurs', value: 1240, pct: 100 },
              { label: 'Vues produit', value: 892, pct: 72 },
              { label: 'Ajouts panier', value: 324, pct: 26 },
              { label: 'Checkout initié', value: 156, pct: 13 },
              { label: 'Achats', value: 48, pct: 4, highlight: true },
            ].map(row => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className={row.highlight ? 'font-bold text-ink-900' : 'text-ink-600'}>{row.label}</span>
                  <span className="font-medium">{row.value} <span className="text-ink-400 text-xs">({row.pct}%)</span></span>
                </div>
                <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.highlight ? 'bg-barka-600' : 'bg-ink-300'}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
