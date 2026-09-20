import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarkaLogo } from '@/components/layout/BarkaLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { TUNISIAN_GOVERNORATES, slugify } from '@/lib/utils'
import { Facebook } from '@/components/icons'
import { ArrowRight, ArrowLeft, Check, Store, Palette, Package, Truck, Rocket } from 'lucide-react'

type Step = {
  id: string
  title: string
  icon: any
  optional?: boolean
}

const steps: Step[] = [
  { id: 'store', title: 'Boutique', icon: Store },
  { id: 'theme', title: 'Thème', icon: Palette },
  { id: 'product', title: 'Premier produit', icon: Package },
  { id: 'delivery', title: 'Livraison', icon: Truck, optional: true },
  { id: 'meta', title: 'Meta', icon: Facebook, optional: true },
  { id: 'launch', title: 'Lancer', icon: Rocket },
]

export function OnboardingWizard() {
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState({
    storeName: '',
    slug: '',
    language: 'fr' as 'fr' | 'ar' | 'en',
    currency: 'TND',
    theme: 'modern',
    productName: '',
    productPrice: '',
    governorate: 'Tunis',
    deliveryFee: '8',
  })
  const navigate = useNavigate()

  const progress = ((current + 1) / steps.length) * 100

  const handleNext = () => {
    if (current < steps.length - 1) setCurrent(c => c + 1)
    else navigate('/dashboard')
  }

  const handlePrev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col">
      <header className="h-[64px] border-b border-ink-100 bg-white px-6 flex items-center justify-between">
        <BarkaLogo size="sm" />
        <div className="text-sm text-ink-500">Étape {current + 1} sur {steps.length}</div>
      </header>

      <div className="flex-1 flex">
        <div className="hidden lg:flex w-[300px] bg-white border-r border-ink-100 p-6 flex-col">
          <div className="mb-8">
            <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
              <div className="h-full bg-barka-600 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-xs text-ink-500">{Math.round(progress)}% complété</p>
          </div>

          <div className="space-y-1">
            {steps.map((step, idx) => {
              const isActive = idx === current
              const isDone = idx < current
              return (
                <div key={step.id} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${isActive ? 'bg-barka-50 border border-barka-200 text-barka-800' : isDone ? 'text-ink-900' : 'text-ink-500'}`}>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-barka-600 text-white' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}>
                    {isDone ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step.title}</p>
                    {step.optional && <p className="text-[11px] text-ink-400">Optionnel</p>}
                  </div>
                  {isActive && <div className="h-2 w-2 rounded-full bg-barka-600 animate-pulse" />}
                </div>
              )
            })}
          </div>

          <div className="mt-auto rounded-xl bg-sand-50 border border-sand-200 p-4">
            <p className="text-sm font-medium text-ink-900">Astuce Barka</p>
            <p className="text-xs text-ink-600 mt-1 leading-relaxed">Vous pouvez ignorer les étapes optionnelles et les compléter plus tard depuis le dashboard. Le mode COD est activé par défaut.</p>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-10 flex items-center justify-center">
          <Card className="w-full max-w-[560px] shadow-sm">
            <CardContent className="p-8">
              {current === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">Créez votre boutique</h2>
                    <p className="text-sm text-ink-600 mt-1">Choisissez un nom et un slug pour votre boutique</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nom de la boutique</Label>
                      <Input placeholder="Boutique Élégance" value={form.storeName} onChange={e => {
                        const name = e.target.value
                        setForm(f => ({ ...f, storeName: name, slug: slugify(name) }))
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug (URL)</Label>
                      <div className="flex items-center gap-2">
                        <Input value={form.slug} onChange={e => setForm({...form, slug: slugify(e.target.value)})} placeholder="boutique-elegance" className="flex-1" />
                        <span className="text-sm text-ink-500 whitespace-nowrap">.barka.tn</span>
                      </div>
                      <p className="text-xs text-ink-400">Lettres minuscules, chiffres et tirets uniquement</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Langue principale</Label>
                        <Select value={form.language} onChange={e => setForm({...form, language: e.target.value as any})}>
                          <option value="fr">Français</option>
                          <option value="ar">العربية</option>
                          <option value="en">English</option>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Devise</Label>
                        <Select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}>
                          <option value="TND">TND - Dinar Tunisien</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="USD">USD - Dollar</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">Choisissez un thème</h2>
                    <p className="text-sm text-ink-600 mt-1">Designs originaux sans images humaines - objets & packaging</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'modern', name: 'Modern Store', desc: 'Épuré & premium' },
                      { id: 'fashion', name: 'Fashion Product', desc: 'Produits sur fond neutre' },
                      { id: 'electronics', name: 'Electronics', desc: 'Tech & gadgets' },
                      { id: 'beauty', name: 'Beauty Product', desc: 'Cosmétiques objet-only' },
                    ].map(t => (
                      <button key={t.id} onClick={() => setForm({...form, theme: t.id})} className={`text-left rounded-xl border p-4 transition-all ${form.theme === t.id ? 'border-barka-300 bg-barka-50 ring-1 ring-barka-300' : 'border-ink-200 hover:border-ink-300 bg-white'}`}>
                        <div className="h-20 rounded-lg bg-gradient-to-br from-sand-100 to-ink-50 mb-3 flex items-center justify-center">
                          <Palette className="h-6 w-6 text-ink-400" />
                        </div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-ink-500">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {current === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">Ajoutez votre premier produit</h2>
                    <p className="text-sm text-ink-600 mt-1">Vous pourrez en ajouter plus tard - sans modèle humain</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nom du produit</Label>
                      <Input placeholder="Robe d'été en lin - coupe évasée" value={form.productName} onChange={e => setForm({...form, productName: e.target.value})} />
                      <p className="text-xs text-ink-400">Décrivez le produit, pas la personne qui le porte</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Prix (TND)</Label>
                      <Input type="number" placeholder="89.000" value={form.productPrice} onChange={e => setForm({...form, productPrice: e.target.value})} />
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                      <strong>Règle Barka:</strong> Photos produits sur fond neutre, sans modèles humains. Ex: "Robe photographiée sur cintre, fond blanc".
                    </div>
                  </div>
                </div>
              )}

              {current === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">Configurez la livraison</h2>
                    <p className="text-sm text-ink-600 mt-1">Optionnel - vous pouvez le faire plus tard</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Gouvernorat principal</Label>
                      <Select value={form.governorate} onChange={e => setForm({...form, governorate: e.target.value})}>
                        {TUNISIAN_GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Frais de livraison de base (TND)</Label>
                      <Input type="number" value={form.deliveryFee} onChange={e => setForm({...form, deliveryFee: e.target.value})} />
                    </div>
                    <div className="rounded-xl bg-ink-50 border border-ink-200 p-3 text-xs text-ink-600">
                      Barka utilise DeliveryProvider abstraction. MockDeliveryProvider est actif en dev. Ajoutez vos clés API MesColis/Aramex etc. dans Dashboard → Livraison quand vous les avez.
                    </div>
                  </div>
                </div>
              )}

              {current === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">Intégration Meta (optionnel)</h2>
                    <p className="text-sm text-ink-600 mt-1">Pixel + Conversions API pour booster vos ventes</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Pixel ID (optionnel)</Label>
                      <Input placeholder="123456789012345" />
                    </div>
                    <div className="space-y-2">
                      <Label>Access Token CAPI (sécurisé, jamais exposé frontend)</Label>
                      <Input type="password" placeholder="EAA..." />
                    </div>
                    <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800">
                      Vos credentials Meta sont chiffrés et stockés côté serveur. Jamais exposés au navigateur. Support event_id pour déduplication Pixel/CAPI.
                    </div>
                  </div>
                </div>
              )}

              {current === 5 && (
                <div className="space-y-6 text-center py-4">
                  <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Rocket className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Votre boutique est prête !</h2>
                    <p className="text-sm text-ink-600 mt-2 max-w-[400px] mx-auto">Vous avez configuré l'essentiel. Votre boutique <strong>{form.storeName || 'Boutique'}</strong> sera accessible sur <strong>{form.slug || 'votre-boutique'}.barka.tn</strong></p>
                  </div>
                  <div className="rounded-xl bg-ink-50 border border-ink-200 p-4 text-left text-sm space-y-2">
                    <p className="font-medium">Prochaines étapes recommandées:</p>
                    <div className="space-y-1.5 text-ink-600 text-xs">
                      <p>✓ Ajouter plus de produits (CSV import dispo)</p>
                      <p>✓ Configurer livraison multi-zones</p>
                      <p>✓ Connecter Meta Pixel & CAPI</p>
                      <p>✓ Personnaliser design & domaine</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-100">
                <Button variant="ghost" onClick={handlePrev} disabled={current === 0}>
                  <ArrowLeft className="h-4 w-4" /> Retour
                </Button>
                <div className="flex gap-2">
                  {steps[current].optional && current < steps.length - 1 && (
                    <Button variant="outline" onClick={handleNext}>Ignorer</Button>
                  )}
                  <Button onClick={handleNext}>
                    {current === steps.length - 1 ? 'Aller au dashboard' : 'Continuer'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
