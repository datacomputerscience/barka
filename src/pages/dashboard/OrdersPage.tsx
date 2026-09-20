import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ORDER_STATUSES, formatTND } from '@/lib/utils'
import { Search, Eye, Truck, Phone } from 'lucide-react'

const mockOrders = [
  { id: '1', number: 'BRK-4829', customer: 'Amira Ben Ahmed', phone: '+216 22 345 678', governorate: 'Tunis', total: 149.0, status: 'pending', created: 'Il y a 2h', items: 2 },
  { id: '2', number: 'BRK-4828', customer: 'Mohamed Trabelsi', phone: '+216 98 123 456', governorate: 'Sfax', total: 89.5, status: 'confirmed', created: 'Il y a 5h', items: 1 },
  { id: '3', number: 'BRK-4827', customer: 'Sarra Khelifi', phone: '+216 20 987 654', governorate: 'Sousse', total: 210.0, status: 'shipped', created: 'Hier', items: 3 },
  { id: '4', number: 'BRK-4826', customer: 'Youssef Gharbi', phone: '+216 50 111 222', governorate: 'Nabeul', total: 59.0, status: 'delivered', created: 'Hier', items: 1 },
  { id: '5', number: 'BRK-4825', customer: 'Leila Mansour', phone: '+216 27 333 444', governorate: 'Ariana', total: 134.0, status: 'out_for_delivery', created: 'Il y a 2j', items: 2 },
]

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Commandes</h1>
          <p className="text-sm text-ink-600">Gestion COD complète avec historique statuts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exporter CSV</Button>
          <Button size="sm">Commande manuelle</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {ORDER_STATUSES.slice(0,5).map(s => (
          <Card key={s.value} className="hover:shadow-sm transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <p className="text-xs text-ink-500">{s.label}</p>
              <p className="text-[20px] font-bold mt-1">{Math.floor(Math.random()*20)+2}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
              <Input placeholder="Rechercher commande, client, téléphone..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm">Filtres</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-ink-50/50 text-xs text-ink-500">
                <tr>
                  <th className="text-left p-4 font-medium">Commande</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {mockOrders.map(o => {
                  const status = ORDER_STATUSES.find(s => s.value === o.status)
                  return (
                    <tr key={o.id} className="hover:bg-ink-50/50">
                      <td className="p-4">
                        <p className="text-sm font-mono font-bold">{o.number}</p>
                        <p className="text-xs text-ink-500">{o.items} articles • {o.governorate}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{o.customer}</p>
                        <p className="text-xs text-ink-500 flex items-center gap-1"><Phone className="h-3 w-3" /> {o.phone}</p>
                      </td>
                      <td className="p-4 text-sm font-bold">{formatTND(o.total)}</td>
                      <td className="p-4"><Badge className={`${status?.color} border`}>{status?.label}</Badge></td>
                      <td className="p-4 text-xs text-ink-500">{o.created}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8"><Eye className="h-4 w-4" /> Voir</Button>
                          <Button variant="ghost" size="sm" className="h-8"><Truck className="h-4 w-4" /> Expédier</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-[14px]">Workflow commande Barka (serveur-side)</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-ink-600 space-y-1">
          <p>1. Validation panier serveur • 2. Vérif stock & prix DB • 3. Calcul sous-total/remise/livraison serveur • 4. Création order + order_items • 5. Update inventory sécurisé • 6. Historique status • 7. Analytics • 8. Meta Purchase event avec event_id deduplication • 9. Confirmation</p>
          <p className="font-medium text-ink-900 mt-2">Jamais de confiance aux totaux navigateur. Toujours recalcul serveur.</p>
        </CardContent>
      </Card>
    </div>
  )
}
