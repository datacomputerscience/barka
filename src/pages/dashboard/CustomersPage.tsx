import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatTND } from '@/lib/utils'
import { Users, Phone, Mail, MapPin, ShoppingBag, Search, TrendingUp } from 'lucide-react'

const customers = [
  { id: '1', name: 'Amira Ben Ahmed', phone: '+216 22 345 678', email: 'amira@exemple.tn', governorate: 'Tunis', orders: 4, spent: 420.5, last: 'Il y a 2j', status: 'vip' },
  { id: '2', name: 'Mohamed Trabelsi', phone: '+216 98 123 456', email: null, governorate: 'Sfax', orders: 2, spent: 149.0, last: 'Il y a 5j', status: 'active' },
  { id: '3', name: 'Sarra Khelifi', phone: '+216 20 987 654', email: 'sarra@exemple.tn', governorate: 'Sousse', orders: 6, spent: 890.0, last: 'Hier', status: 'vip' },
  { id: '4', name: 'Youssef Gharbi', phone: '+216 50 111 222', email: null, governorate: 'Nabeul', orders: 1, spent: 59.0, last: 'Il y a 1 sem', status: 'new' },
]

export function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Clients</h1>
          <p className="text-sm text-ink-600">Base clients tenant-isolée, LTV, historique commandes</p>
        </div>
        <Button variant="outline" size="sm">Exporter CSV</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Total clients</p><p className="text-[22px] font-bold mt-1">312</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +18 ce mois</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Clients VIP</p><p className="text-[22px] font-bold mt-1">24</p><p className="text-xs text-ink-400 mt-1">LTV &gt; 500 TND</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Nouveaux (30j)</p><p className="text-[22px] font-bold mt-1">42</p><p className="text-xs text-ink-400 mt-1">Taux rétention 68%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Panier moyen client</p><p className="text-[22px] font-bold mt-1">{formatTND(89.5)}</p><p className="text-xs text-ink-400 mt-1">Sur 12 mois</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
            <Input placeholder="Rechercher client, téléphone, gouvernorat..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                <tr>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Localisation</th>
                  <th className="text-left p-4 font-medium">Commandes</th>
                  <th className="text-left p-4 font-medium">Total dépensé</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-ink-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-barka-100 border border-barka-200 flex items-center justify-center text-barka-700 font-bold text-xs">{c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-ink-500">Dernière: {c.last}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-ink-400" /> {c.phone}</p>
                      {c.email && <p className="flex items-center gap-1.5 text-xs text-ink-500 mt-1"><Mail className="h-3 w-3" /> {c.email}</p>}
                    </td>
                    <td className="p-4"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-ink-400" /> {c.governorate}</span></td>
                    <td className="p-4"><span className="flex items-center gap-1"><ShoppingBag className="h-3.5 w-3.5 text-ink-400" /> {c.orders}</span></td>
                    <td className="p-4 font-bold">{formatTND(c.spent)}</td>
                    <td className="p-4">
                      {c.status === 'vip' && <Badge variant="success">VIP</Badge>}
                      {c.status === 'active' && <Badge variant="secondary">Actif</Badge>}
                      {c.status === 'new' && <Badge variant="outline">Nouveau</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4 flex gap-3 text-sm">
          <Users className="h-5 w-5 text-blue-600 shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">Clients sans compte - achat invité</p>
            <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">Barka permet achat sans création compte (comme demandé). Clients créés automatiquement via téléphone. Pas de friction checkout. RLS: customer.store_id = auth.store_id</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
