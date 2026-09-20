import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Banknote, ShieldCheck, AlertTriangle, Check, Zap } from 'lucide-react'

export function PaymentsPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Paiements</h1>
        <p className="text-sm text-ink-600">COD principal, architecture adaptateur pour futurs providers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="text-[16px] flex items-center gap-2"><Banknote className="h-5 w-5 text-emerald-600" /> Paiement à la livraison (COD)</CardTitle>
            <CardDescription>Activé par défaut, priorité Tunisie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border">
              <div>
                <p className="text-sm font-medium">COD activé</p>
                <p className="text-xs text-ink-500">Paiement à réception, pas de carte nécessaire</p>
              </div>
              <Badge variant="success"><Check className="h-3 w-3" /> Actif</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-ink-600">Commandes COD ce mois</span><span className="font-bold">76</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Taux livraison réussie</span><span className="font-bold text-emerald-600">94%</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Retours</span><span className="font-bold">3 (4%)</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[16px] flex items-center gap-2"><CreditCard className="h-5 w-5" /> Paiement en ligne (futur)</CardTitle>
            <CardDescription>Architecture adaptateur prête</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-2 text-xs text-amber-800">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p>Ne pas hard-coder autour d'un provider. Utilisez interface PaymentProvider. Implémentez uniquement avec docs officielles.</p>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Flouci', desc: 'Tunisie - API requise', status: 'À configurer' },
                { name: 'Konnect', desc: 'Tunisie - API requise', status: 'À configurer' },
                { name: 'Stripe', desc: 'International', status: 'À configurer' },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between p-3 rounded-xl border">
                  <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-ink-500">{p.desc}</p></div>
                  <Badge variant="secondary">{p.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-ink-950 text-white border-ink-800">
        <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><Zap className="h-4 w-4" /> Architecture paiement Barka</CardTitle></CardHeader>
        <CardContent className="text-xs leading-relaxed space-y-3 text-ink-300">
          <div>
            <p className="font-semibold text-white">Interface PaymentProvider (adaptateur):</p>
            <pre className="mt-2 bg-white/10 p-3 rounded-xl overflow-x-auto text-[11px]">
{`interface PaymentProvider {
  createPayment(order): Promise<{payment_id, status, redirect_url?}>
  verifyPayment(payment_id): Promise<PaymentStatus>
  refundPayment(payment_id, amount): Promise<boolean>
  handleWebhook(payload): Promise<void>
}`}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-white">Sécurité:</p>
            <ul className="mt-1 space-y-1 list-disc list-inside">
              <li>Jamais hard-coder app autour d'un provider</li>
              <li>Calcul totaux serveur-side toujours</li>
              <li>Webhooks vérifiés avec signature</li>
              <li>Credentials chiffrés côté serveur</li>
              <li>COD reste first-class, pas fallback</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-[16px]">Flux paiement Barka</CardTitle></CardHeader>
        <CardContent className="text-sm text-ink-600 leading-relaxed space-y-2">
          <p>1. Client choisit COD (ou futur: carte) • 2. Serveur valide panier, calcule total • 3. Crée order avec payment_status=pending • 4. Si COD: status=pending, attente confirmation téléphone • 5. Si online: redirect vers provider, webhook confirme • 6. Historique status, analytics, Meta Purchase event</p>
        </CardContent>
      </Card>
    </div>
  )
}
