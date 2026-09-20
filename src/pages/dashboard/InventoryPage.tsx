import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatTND } from '@/lib/utils'
import { Package, AlertTriangle, TrendingDown, TrendingUp, Plus, Minus, History } from 'lucide-react'

const inventory = [
  { id: '1', product: 'Robe lin beige', sku: 'BRK-LIN01', stock: 24, reserved: 2, threshold: 5, price: 89, status: 'ok' },
  { id: '2', product: 'Support smartphone alu', sku: 'BRK-TECH02', stock: 3, reserved: 1, threshold: 5, price: 29.9, status: 'low' },
  { id: '3', product: 'Sac tote coton', sku: 'BRK-BAG03', stock: 28, reserved: 0, threshold: 5, price: 45, status: 'ok' },
  { id: '4', product: 'Bocaux verre x3', sku: 'BRK-HOME04', stock: 0, reserved: 0, threshold: 5, price: 59, status: 'out' },
  { id: '5', product: 'Huile argan 50ml', sku: 'BRK-BEA05', stock: 42, reserved: 5, threshold: 10, price: 35.5, status: 'ok' },
]

const movements = [
  { id: '1', type: 'out', product: 'Robe lin beige', qty: -2, reason: 'Commande BRK-4829', time: 'Il y a 2h', user: 'Système' },
  { id: '2', type: 'in', product: 'Sac tote coton', qty: +20, reason: 'Réapprovisionnement', time: 'Hier', user: 'Ahmed' },
  { id: '3', type: 'adjustment', product: 'Support smartphone', qty: -1, reason: 'Inventaire - casse', time: 'Il y a 2j', user: 'Ahmed' },
]

export function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Inventaire</h1>
          <p className="text-sm text-ink-600">Gestion stock réel avec mouvements, seuils, SKU - pas de state frontend</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><History className="h-4 w-4" /> Mouvements</Button>
          <Button size="sm"><Plus className="h-4 w-4" /> Ajustement stock</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Valeur stock total</p><p className="text-[20px] font-bold mt-1">{formatTND(5240.5)}</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +12% ce mois</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Produits en stock</p><p className="text-[20px] font-bold mt-1">97</p><p className="text-xs text-ink-400 mt-1">Sur 124 actifs</p></CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/50"><CardContent className="p-4"><p className="text-xs text-amber-700">Stock faible</p><p className="text-[20px] font-bold mt-1 text-amber-800">3</p><p className="text-xs text-amber-700 mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Action requise</p></CardContent></Card>
        <Card className="border-red-200 bg-red-50/50"><CardContent className="p-4"><p className="text-xs text-red-700">Ruptures</p><p className="text-[20px] font-bold mt-1 text-red-800">1</p><p className="text-xs text-red-700 mt-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> À réapprovisionner</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[16px]">Stock par produit</CardTitle>
          <div className="flex gap-2">
            <Input placeholder="Rechercher SKU..." className="h-8 w-[180px]" />
            <Button variant="outline" size="sm">Filtres</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                <tr>
                  <th className="text-left p-3 font-medium">Produit</th>
                  <th className="text-left p-3 font-medium">SKU</th>
                  <th className="text-left p-3 font-medium">Stock</th>
                  <th className="text-left p-3 font-medium">Réservé</th>
                  <th className="text-left p-3 font-medium">Disponible</th>
                  <th className="text-left p-3 font-medium">Statut</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-ink-50/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-sand-100 border flex items-center justify-center"><Package className="h-4 w-4 text-sand-800/50" /></div>
                        <span className="font-medium">{item.product}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-xs">{item.sku}</td>
                    <td className="p-3 font-bold">{item.stock}</td>
                    <td className="p-3 text-ink-500">{item.reserved}</td>
                    <td className="p-3 font-bold">{item.stock - item.reserved}</td>
                    <td className="p-3">
                      {item.status === 'ok' && <Badge variant="success">OK</Badge>}
                      {item.status === 'low' && <Badge variant="warning">Faible</Badge>}
                      {item.status === 'out' && <Badge variant="destructive">Rupture</Badge>}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="outline" size="icon" className="h-7 w-7"><Plus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-7 w-7"><Minus className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-[16px]">Mouvements récents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {movements.map(m => (
              <div key={m.id} className="flex gap-3 p-3 rounded-xl border border-ink-100">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${m.type === 'in' ? 'bg-emerald-50 text-emerald-600' : m.type === 'out' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  {m.type === 'in' ? <Plus className="h-4 w-4" /> : m.type === 'out' ? <Minus className="h-4 w-4" /> : <History className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{m.product} <span className={`font-bold ${m.qty > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</span></p>
                  <p className="text-xs text-ink-500">{m.reason} • {m.time} • {m.user}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-ink-950 text-white border-ink-800">
          <CardHeader><CardTitle className="text-[14px]">Sécurité inventaire Barka</CardTitle></CardHeader>
          <CardContent className="text-xs leading-relaxed space-y-2 text-ink-300">
            <p>• Stock jamais en state frontend seulement - toujours en DB avec RLS</p>
            <p>• Décrémentation avec `SELECT ... FOR UPDATE` ou RPC `decrement_stock()`</p>
            <p>• Table `inventory_movements` avec type: in/out/adjustment/reserved/released</p>
            <p>• Seuil alerte configurable par produit</p>
            <p>• Historique complet pour audit</p>
            <div className="mt-4 rounded-lg bg-white/10 p-3 font-mono text-[11px]">
              UPDATE products SET stock_quantity = stock_quantity - $qty WHERE id = $id AND stock_quantity &gt;= $qty
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
