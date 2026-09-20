import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatTND } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

const data = [
  { date: '01/09', revenue: 320, orders: 8 },
  { date: '02/09', revenue: 450, orders: 12 },
  { date: '03/09', revenue: 380, orders: 9 },
  { date: '04/09', revenue: 620, orders: 18 },
  { date: '05/09', revenue: 540, orders: 14 },
  { date: '06/09', revenue: 890, orders: 22 },
  { date: '07/09', revenue: 760, orders: 19 },
]

const statusData = [
  { name: 'Livrées', value: 42, color: '#10b981' },
  { name: 'En cours', value: 18, color: '#3b82f6' },
  { name: 'En attente', value: 12, color: '#f59e0b' },
  { name: 'Annulées', value: 4, color: '#ef4444' },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Analytiques</h1>
        <p className="text-sm text-ink-600">Tenant-isolé • RLS • Temps réel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenu total', value: formatTND(4520.5), sub: '+12.5% vs sem dernière' },
          { label: 'Commandes', value: '76', sub: 'Taux conversion 3.8%' },
          { label: 'Panier moyen', value: formatTND(59.4), sub: 'AOV' },
          { label: 'Visiteurs', value: '1,240', sub: '892 vues produit' },
        ].map(k => (
          <Card key={k.label}><CardContent className="p-5"><p className="text-xs text-ink-500">{k.label}</p><p className="text-[20px] font-bold mt-1">{k.value}</p><p className="text-xs text-ink-400 mt-1">{k.sub}</p></CardContent></Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-[16px]">Revenus & commandes - 7 jours</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="date" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#0d9f4a" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-[16px]">Répartition statuts</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {statusData.map((e,i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full" style={{ background: s.color }} /> {s.name}</div>
                  <Badge variant="secondary">{s.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[16px]">Architecture analytique Barka</CardTitle></CardHeader>
        <CardContent className="text-sm text-ink-600 leading-relaxed space-y-2">
          <p>• Table <code>analytics_events</code> avec event_type: page_view, product_view, add_to_cart, initiate_checkout, purchase</p>
          <p>• Tenant-isolé par store_id avec RLS. Pas de fuite inter-boutiques.</p>
          <p>• Agrégation via vues matérialisées ou Edge Functions pour dashboard temps réel.</p>
          <p>• Intégration Meta: Purchase events dédupliqués via event_id servent aussi à l'analytics interne.</p>
        </CardContent>
      </Card>
    </div>
  )
}
