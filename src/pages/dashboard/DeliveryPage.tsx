import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { TUNISIAN_PROVIDERS } from '@/lib/delivery'
import { Truck, ShieldCheck, AlertCircle, Check } from 'lucide-react'

export function DeliveryPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Livraison</h1>
        <p className="text-sm text-ink-600">Abstraction multi-transporteurs tunisiens • Mock prêt, API réelle quand dispo</p>
      </div>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4 flex gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0"><ShieldCheck className="h-5 w-5" /></div>
          <div className="text-sm">
            <p className="font-semibold text-blue-900">Architecture sécurisée</p>
            <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">Credentials jamais exposés frontend. Stockés chiffrés côté serveur via Supabase Vault / Edge Functions. Interface DeliveryProvider: createShipment(), getShipment(), trackShipment(), cancelShipment(), calculateDeliveryFee().</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">Transporteurs disponibles</CardTitle>
            <CardDescription>Choisissez et configurez vos prestataires</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {TUNISIAN_PROVIDERS.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-ink-200 hover:border-ink-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-ink-50 border flex items-center justify-center"><Truck className="h-5 w-5 text-ink-600" /></div>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.id === 'mock' ? <Badge variant="success">Actif</Badge> : <Badge variant="secondary">À configurer</Badge>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">Configuration transporteur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Transporteur</Label>
              <Select defaultValue="mock">
                {TUNISIAN_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>API Key / Token (chiffré serveur)</Label>
              <Input type="password" placeholder="••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label>API Secret (chiffré serveur)</Label>
              <Input type="password" placeholder="••••••••••••" />
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>Ne jamais inventer d'API. Implémentez uniquement avec documentation officielle. MockDeliveryProvider est utilisé tant que credentials non fournis.</p>
            </div>
            <Button className="w-full">Sauvegarder & tester connexion</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[16px]">Zones & tarifs</CardTitle>
          <CardDescription>Frais par gouvernorat - calcul serveur-side</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { gov: 'Tunis, Ariana, Ben Arous, Manouba', fee: 7, days: '24-48h' },
              { gov: 'Nabeul, Bizerte, Sousse', fee: 8, days: '24-72h' },
              { gov: 'Sfax, Kairouan, Autres', fee: 10, days: '48-96h' },
            ].map(z => (
              <div key={z.gov} className="rounded-xl border border-ink-200 p-4">
                <p className="text-sm font-medium">{z.gov}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[20px] font-bold">{z.fee}</span><span className="text-xs text-ink-500">TND</span>
                  <span className="ml-auto text-xs text-ink-500">{z.days}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">Ajouter zone</Button>
            <Button variant="outline" size="sm">Importer depuis transporteur</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[16px]">Expéditions récentes (Mock)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                <tr>
                  <th className="text-left p-3 font-medium">Tracking</th>
                  <th className="text-left p-3 font-medium">Commande</th>
                  <th className="text-left p-3 font-medium">Statut</th>
                  <th className="text-right p-3 font-medium">COD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {[
                  { track: 'MOCK-1714829-AB12', order: 'BRK-4829', status: 'in_transit', cod: 149 },
                  { track: 'MOCK-1714828-XZ99', order: 'BRK-4828', status: 'picked_up', cod: 89.5 },
                  { track: 'MOCK-1714827-PL33', order: 'BRK-4827', status: 'delivered', cod: 210 },
                ].map(s => (
                  <tr key={s.track} className="hover:bg-ink-50/50">
                    <td className="p-3 font-mono text-xs">{s.track}</td>
                    <td className="p-3 font-medium">{s.order}</td>
                    <td className="p-3"><Badge variant={s.status === 'delivered' ? 'success' : 'secondary'}>{s.status}</Badge></td>
                    <td className="p-3 text-right font-bold">{s.cod} TND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
