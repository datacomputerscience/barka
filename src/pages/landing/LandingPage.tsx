import { Link } from 'react-router-dom'
import { BarkaLogo } from '@/components/layout/BarkaLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Facebook } from '@/components/icons'
import { 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  Palette, 
  ShieldCheck, 
  Zap, 
  Globe,
  Package,
  Languages,
  ArrowRight,
  Check,
  Star,
  MapPin,
  Boxes
} from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-ink-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-6 h-[64px] flex items-center justify-between">
          <BarkaLogo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-600">
            <a href="#features" className="hover:text-ink-900">Fonctionnalités</a>
            <a href="#delivery" className="hover:text-ink-900">Livraison</a>
            <a href="#meta" className="hover:text-ink-900">Meta</a>
            <a href="#pricing" className="hover:text-ink-900">Tarifs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Commencer gratuitement <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 barka-gradient-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,159,74,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(13,159,74,0.06),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="success" className="mb-4 gap-1.5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Conçu pour la Tunisie • Paiement à la livraison
              </Badge>
              <h1 className="font-display text-[40px] lg:text-[56px] font-bold leading-[0.95] tracking-tight text-ink-900">
                Votre boutique en ligne <span className="text-barka-600">tunisienne</span> en quelques minutes
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-ink-600 max-w-[520px]">
                Barka est la plateforme e-commerce tout-en-un pour la Tunisie. Gestion COD, livraison locale, tracking Meta Pixel & CAPI — tout ce dont vous avez besoin pour vendre en ligne.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button size="lg" className="h-12 px-7 text-base">
                    Commencer gratuitement
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/s/demo">
                  <Button variant="outline" size="lg" className="h-12 px-7 text-base bg-white">
                    Voir boutique démo
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-sand-200 flex items-center justify-center text-[10px] font-bold">★</div>
                    ))}
                  </div>
                  <span className="text-ink-600"><strong className="text-ink-900">+1,200</strong> marchands</span>
                </div>
                <div className="h-4 w-px bg-ink-200" />
                <div className="flex items-center gap-1.5 text-ink-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong className="text-ink-900">4.9/5</strong> satisfaction
                </div>
              </div>
            </div>

            <div className="relative lg:h-[560px]">
              <div className="relative mx-auto max-w-[480px] lg:absolute lg:inset-0">
                <div className="relative z-20 mx-auto w-[280px] rounded-[2.5rem] bg-ink-900 p-2.5 shadow-2xl animate-float">
                  <div className="rounded-[2rem] bg-white overflow-hidden">
                    <div className="h-6 bg-ink-50 flex items-center justify-center gap-1">
                      <div className="h-1 w-12 rounded-full bg-ink-200" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-3 w-20 bg-ink-900 rounded" />
                        <div className="h-6 w-6 rounded-full bg-barka-100" />
                      </div>
                      <div className="space-y-3">
                        <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-sand-100 to-sand-200 flex items-center justify-center">
                          <Package className="h-12 w-12 text-sand-800/50" />
                        </div>
                        <div className="h-4 w-3/4 bg-ink-900 rounded" />
                        <div className="h-3 w-1/2 bg-ink-200 rounded" />
                        <div className="flex gap-2 pt-2">
                          <div className="flex-1 h-10 rounded-xl bg-barka-600" />
                          <div className="h-10 w-10 rounded-xl bg-ink-100" />
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-ink-100 space-y-2">
                        <div className="flex justify-between text-xs"><span className="text-ink-500">Sous-total</span><span className="font-bold">149,000 TND</span></div>
                        <div className="flex justify-between text-xs"><span className="text-ink-500">Livraison</span><span className="font-bold text-emerald-600">8,000 TND</span></div>
                        <div className="h-10 rounded-xl bg-ink-900 flex items-center justify-center text-white text-sm font-medium">Payer à la livraison</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[8%] -right-2 lg:-right-8 z-30 rounded-2xl bg-white border border-ink-200 shadow-xl p-3 flex items-center gap-3 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center"><Truck className="h-5 w-5 text-emerald-600" /></div>
                  <div><p className="text-xs font-bold text-ink-900">Commande livrée</p><p className="text-[11px] text-ink-500">#BRK-4829 • Tunis</p></div>
                </div>

                <div className="absolute bottom-[18%] -left-2 lg:-left-10 z-30 rounded-2xl bg-white border border-ink-200 shadow-xl p-3 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center"><Facebook className="h-5 w-5 text-blue-600" /></div>
                  <div><p className="text-xs font-bold text-ink-900">Pixel Purchase</p><p className="text-[11px] text-ink-500">+1 événement CAPI</p></div>
                </div>

                <div className="absolute top-[45%] -left-4 lg:-left-6 z-10 rounded-xl bg-ink-900 text-white px-3 py-2 shadow-xl text-xs font-medium">
                  <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Stock: 24 unités</div>
                </div>

                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-barka-100 blur-2xl" />
                  <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-sand-200 blur-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-20 border-t border-ink-100 pt-8 flex flex-wrap items-center justify-between gap-6 text-sm text-ink-500">
            <p className="font-medium">Intégrations locales prêtes:</p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2"><Boxes className="h-4 w-4" /> MesColis • Aramex • First Delivery</span>
              <span className="flex items-center gap-2"><Facebook className="h-4 w-4" /> Meta Pixel & CAPI</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 24 Gouvernorats</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 lg:py-28 bg-[#fcfcf9]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-3">Plateforme complète</Badge>
            <h2 className="font-display text-[32px] lg:text-[44px] font-bold leading-[0.95] tracking-tight text-ink-900">Tout ce dont vous avez besoin pour vendre en Tunisie</h2>
            <p className="mt-4 text-[17px] text-ink-600">Conçu pour les réalités du commerce tunisien: COD, livraison locale, mobile-first, tracking publicitaire avancé.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShoppingBag, title: 'Paiement à la livraison', desc: 'COD en priorité. Workflow complet: confirmation, préparation, expédition, livraison. Historique des statuts.', color: 'bg-emerald-50 text-emerald-700' },
              { icon: Truck, title: 'Livraison tunisienne', desc: 'Abstraction multi-transporteurs. MesColis, Aramex, First Delivery, Best Delivery. Mock prêt, API réelle quand dispo.', color: 'bg-blue-50 text-blue-700' },
              { icon: Facebook, title: 'Meta Pixel + CAPI', desc: 'Pixel browser + Conversions API server-side avec deduplication event_id. Catalogue produit & flux automatique.', color: 'bg-indigo-50 text-indigo-700' },
              { icon: BarChart3, title: 'Analytiques avancées', desc: 'Revenus, AOV, conversion, top produits, entonnoir. Tenant-isolé avec RLS PostgreSQL.', color: 'bg-purple-50 text-purple-700' },
              { icon: Palette, title: 'Thèmes sans personnes', desc: 'Thèmes originaux modernes, premium. Aucune image humaine - objets, packaging, tech seulement.', color: 'bg-amber-50 text-amber-700' },
              { icon: Globe, title: 'FR / AR / EN + TND', desc: 'Multilingue complet avec RTL arabe. 24 gouvernorats, devises, localisation tunisienne.', color: 'bg-rose-50 text-rose-700' },
            ].map((f) => (
              <Card key={f.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-ink-100">
                <CardContent className="p-6">
                  <div className={`h-12 w-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 border-y border-ink-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-2 gap-12">
          <div className="rounded-[2rem] bg-ink-950 p-8 lg:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-barka-600 rounded-full blur-[80px] opacity-30" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6"><Truck className="h-6 w-6" /></div>
              <h3 className="text-[28px] font-bold leading-tight font-display">Architecture livraison extensible</h3>
              <p className="mt-4 text-ink-300 leading-relaxed">Interface DeliveryProvider avec createShipment, trackShipment, calculateDeliveryFee. Implémentez MesColis, Aramex etc. quand vous avez les docs API. MockDeliveryProvider inclus pour dev.</p>
              <div className="mt-6 space-y-2 text-sm">
                {['Multi-zones par gouvernorat', 'Calcul frais serveur-side', 'Tracking & statuts temps réel', 'Credentials sécurisés (jamais frontend)'].map(t => (
                  <div key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> {t}</div>
                ))}
              </div>
            </div>
          </div>
          <div id="meta" className="rounded-[2rem] bg-[#f0f7ff] border border-blue-100 p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px] opacity-10" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6"><Facebook className="h-6 w-6" /></div>
              <h3 className="text-[28px] font-bold leading-tight font-display text-ink-900">Meta: l'arme de croissance #1</h3>
              <p className="mt-4 text-ink-600 leading-relaxed">Section Meta dédiée. Pixel ID, Dataset ID, Catalog ID, Access Token, Test Event Code. Events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase avec event_id pour déduplication.</p>
              <div className="mt-6 space-y-2 text-sm text-ink-700">
                {['Pixel + CAPI avec déduplication', 'Flux catalogue auto-généré', 'Événements standard Meta', 'Token serveur jamais exposé'].map(t => (
                  <div key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> {t}</div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-white border border-blue-100 p-3 font-mono text-xs text-ink-700">
                <div>fbq('track', 'Purchase', {'{'} value: 149.000, currency: 'TND {'}'}',</div>
                <div className="text-ink-400">{'{'} eventID: '171...abc' {'}'}) // même ID côté CAPI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[36px] font-bold tracking-tight text-ink-900">Commencez gratuit, scalez sans réécrire</h2>
            <p className="mt-4 text-ink-600">Architecture free-first: Cloudflare Pages + Supabase Free. Passez à l'échelle sans refonte.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '0', desc: 'Pour tester Barka', features: ['1 boutique', '100 produits', 'Commandes illimitées COD', 'Meta Pixel', 'Support communauté'] },
              { name: 'Growth', price: '29', desc: 'Pour marchands actifs', features: ['3 boutiques', '1000 produits', 'Meta CAPI + Catalogue', 'Livraison multi-transporteurs', 'Analytiques avancées', 'Domaines personnalisés'], popular: true },
              { name: 'Scale', price: '79', desc: 'Pour équipes & volume', features: ['Boutiques illimitées', 'Produits illimités', 'Rôles & permissions', 'API & Webhooks', 'Support prioritaire', 'Onboarding assisté'] },
            ].map(p => (
              <Card key={p.name} className={`relative ${p.popular ? 'border-barka-300 shadow-xl scale-[1.02]' : 'border-ink-200'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-barka-600">Populaire</Badge></div>}
                <CardContent className="p-8">
                  <h3 className="font-semibold text-ink-900">{p.name}</h3>
                  <p className="text-sm text-ink-500 mt-1">{p.desc}</p>
                  <div className="mt-6 flex items-baseline gap-1"><span className="text-[36px] font-bold text-ink-900">{p.price}</span><span className="text-ink-500">TND/mois</span></div>
                  <div className="mt-6 space-y-3">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-ink-600"><Check className="h-4 w-4 text-barka-600" /> {f}</div>
                    ))}
                  </div>
                  <Button className="w-full mt-8" variant={p.popular ? 'default' : 'outline'}>Choisir {p.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 bg-[#fcfcf9] py-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <BarkaLogo />
              <p className="mt-4 text-sm text-ink-500 max-w-[320px] leading-relaxed">Plateforme e-commerce SaaS multi-tenant pour la Tunisie. Original, sécurisé, sans images humaines. Construit avec React, Supabase, Cloudflare Pages.</p>
              <div className="mt-4 flex gap-2 text-xs text-ink-400">
                <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> RLS activé</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Free-first</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Languages className="h-3.5 w-3.5" /> FR/AR/EN</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 text-sm">
              <div>
                <p className="font-semibold text-ink-900 mb-3">Produit</p>
                <div className="space-y-2 text-ink-600">
                  <p>Fonctionnalités</p><p>Tarifs</p><p>Thèmes</p><p>API Docs</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-ink-900 mb-3">Légal</p>
                <div className="space-y-2 text-ink-600">
                  <p>Confidentialité</p><p>Conditions</p><p>Livraison</p><p>Remboursement</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-ink-100 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-400">
            <p>© 2026 Barka. Tous droits réservés. Marque originale. Aucune copie de TnTech/Shopify.</p>
            <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Tunis, Tunisie • Conçu pour le commerce local</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
