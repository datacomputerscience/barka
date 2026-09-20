import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Ticket, Plus, Percent, Truck, DollarSign } from 'lucide-react'

const coupons = [
  { id: '1', code: 'BIENVENUE10', type: 'percentage', value: 10, min_order: 50, used: 24, limit: 100, active: true, expires: '31/12/2026' },
  { id: '2', code: 'LIVRAISON', type: 'free_delivery', value: 0, min_order: 100, used: 12, limit: 50, active: true, expires: '15/11/2026' },
  { id: '3', code: '20TND', type: 'fixed', value: 20, min_order: 150, used: 8, limit: 20, active: false, expires: '01/10/2026' },
]

export function CouponsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Coupons & Promotions</h1>
          <p className="text-sm text-ink-600">Codes promo: pourcentage, fixe, livraison gratuite - calcul serveur-side</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Nouveau coupon</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/50"><CardContent className="p-4"><p className="text-xs text-emerald-700">Coupons actifs</p><p className="text-[22px] font-bold text-emerald-800 mt-1">12</p><p className="text-xs text-emerald-700/80 mt-1">Taux utilisation 24%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Réductions totales</p><p className="text-[22px] font-bold mt-1">420,500 TND</p><p className="text-xs text-ink-400 mt-1">Ce mois</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Commandes avec coupon</p><p className="text-[22px] font-bold mt-1">38</p><p className="text-xs text-ink-400 mt-1">Sur 76 commandes</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                <tr>
                  <th className="text-left p-4 font-medium">Code</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Valeur</th>
                  <th className="text-left p-4 font-medium">Min commande</th>
                  <th className="text-left p-4 font-medium">Utilisation</th>
                  <th className="text-left p-4 font-medium">Expire</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-ink-50/50">
                    <td className="p-4 font-mono font-bold">{c.code}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5">
                        {c.type === 'percentage' && <Percent className="h-4 w-4 text-blue-600" />}
                        {c.type === 'fixed' && <DollarSign className="h-4 w-4 text-emerald-600" />}
                        {c.type === 'free_delivery' && <Truck className="h-4 w-4 text-purple-600" />}
                        {c.type === 'percentage' ? 'Pourcentage' : c.type === 'fixed' ? 'Fixe' : 'Livraison gratuite'}
                      </span>
                    </td>
                    <td className="p-4 font-bold">{c.type === 'percentage' ? `${c.value}%` : c.type === 'fixed' ? `${c.value} TND` : 'Gratuite'}</td>
                    <td className="p-4">{c.min_order} TND</td>
                    <td className="p-4">{c.used} / {c.limit}</td>
                    <td className="p-4 text-xs">{c.expires}</td>
                    <td className="p-4">{c.active ? <Badge variant="success">Actif</Badge> : <Badge variant="secondary">Inactif</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-ink-950 text-white border-ink-800">
        <CardHeader><CardTitle className="text-[14px]">Sécurité coupons Barka</CardTitle></CardHeader>
        <CardContent className="text-xs leading-relaxed space-y-1 text-ink-300">
          <p>• Validation serveur-side uniquement - jamais confiance au navigateur</p>
          <p>• Vérif: is_active, dates, usage_limit, min_order, produit/catégorie restrictions</p>
          <p>• Calcul discount serveur dans create-order Edge Function</p>
          <p>• Table coupon_usages pour audit</p>
          <p>• Types: percentage, fixed_amount, free_delivery avec conditions: min order, max discount, expiration, usage limit, product/category restrictions</p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau coupon</DialogTitle>
            <DialogDescription>Créez un code promo sécurisé, validation serveur</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Code</Label><Input placeholder="BIENVENUE10" /></div>
              <div className="space-y-2"><Label>Type</Label><Select defaultValue="percentage"><option value="percentage">Pourcentage</option><option value="fixed">Montant fixe</option><option value="free_delivery">Livraison gratuite</option></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Valeur</Label><Input placeholder="10" type="number" /></div>
              <div className="space-y-2"><Label>Commande min (TND)</Label><Input placeholder="50" type="number" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Limite utilisation</Label><Input placeholder="100" type="number" /></div>
              <div className="space-y-2"><Label>Expire le</Label><Input type="date" /></div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Annuler</Button>
              <Button className="flex-1" onClick={() => setOpen(false)}>Créer coupon</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
