import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TUNISIAN_GOVERNORATES, formatTND } from '@/lib/utils'
import { ArrowLeft, ShieldCheck, Truck, Package } from 'lucide-react'

export function CheckoutPage() {
  const { slug } = useParams()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    governorate: 'Tunis',
    city: '',
    address: '',
    info: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const subtotal = 134
  const delivery = 8
  const total = subtotal + delivery

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate server-side order creation
    setSubmitted(true)
    // In real app: POST to Supabase Edge Function that validates server-side, calculates totals, creates order, updates inventory, triggers Meta Purchase event
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fcfcf9] flex items-center justify-center p-6">
        <Card className="max-w-[480px] w-full">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">✓</div>
            <h1 className="text-[22px] font-bold">Commande confirmée !</h1>
            <p className="text-sm text-ink-600 mt-2">Votre commande <strong>BRK-4830</strong> a été reçue. Nous vous appellerons au <strong>{form.phone}</strong> pour confirmer.</p>
            <div className="mt-6 rounded-xl bg-ink-50 border p-4 text-left text-sm space-y-2">
              <div className="flex justify-between"><span className="text-ink-500">Total</span><span className="font-bold">{formatTND(total)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Livraison</span><span>{form.governorate} • {formatTND(delivery)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Paiement</span><span>Paiement à la livraison</span></div>
            </div>
            <Link to={`/s/${slug}`} className="block mt-6"><Button className="w-full">Retour à la boutique</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <header className="h-[64px] bg-white border-b border-ink-100 px-4 lg:px-6 flex items-center gap-4">
        <Link to={`/s/${slug}`}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <h1 className="font-bold">Commande • Paiement à la livraison</h1>
      </header>

      <div className="mx-auto max-w-[1120px] px-4 lg:px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px]">Informations de livraison</CardTitle>
              <p className="text-sm text-ink-600">Tunisie • 24 gouvernorats • Livraison 24-72h</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom *</Label>
                    <Input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="Amira" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Ben Ahmed" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Téléphone * (validation TN)</Label>
                    <Input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+216 22 345 678" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email (optionnel)</Label>
                    <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="amira@exemple.tn" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gouvernorat *</Label>
                    <Select required value={form.governorate} onChange={e => setForm({...form, governorate: e.target.value})}>
                      {TUNISIAN_GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ville *</Label>
                    <Input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Tunis" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adresse complète *</Label>
                  <Input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Rue, immeuble, étage..." />
                </div>

                <div className="space-y-2">
                  <Label>Informations supplémentaires</Label>
                  <Textarea value={form.info} onChange={e => setForm({...form, info: e.target.value})} placeholder="Instructions livraison, point repère..." />
                </div>

                <div className="rounded-xl bg-ink-900 text-white p-4 flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Paiement à la livraison - sécurisé</p>
                    <p className="text-ink-300 text-xs mt-1">Vous payez quand vous recevez. Pas de carte nécessaire. Confirmation par téléphone.</p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base rounded-full bg-ink-900 hover:bg-ink-800">Confirmer commande • {formatTND(total)}</Button>
                <p className="text-xs text-center text-ink-500">En confirmant, vous acceptez nos conditions. Calcul total serveur-side sécurisé.</p>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Résumé commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: 'Robe lin beige', qty: 1, price: 89 },
                  { name: 'Sac tote coton', qty: 1, price: 45 },
                ].map(i => (
                  <div key={i.name} className="flex gap-3">
                    <div className="h-14 w-14 rounded-xl bg-sand-50 border flex items-center justify-center"><Package className="h-5 w-5 text-sand-300" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">{i.name}</p>
                      <p className="text-xs text-ink-500">Qté: {i.qty}</p>
                    </div>
                    <p className="text-sm font-bold">{formatTND(i.price)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink-600">Sous-total</span><span>{formatTND(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-ink-600">Livraison ({form.governorate})</span><span>{formatTND(delivery)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t"><span>Total</span><span>{formatTND(total)}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex gap-3 text-sm">
              <Truck className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Livraison estimée</p>
                <p className="text-blue-700/80 text-xs mt-1">24-48h pour Tunis, 48-72h autres gouvernorats. Suivi par SMS.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
