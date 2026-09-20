import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BarkaLogo } from '@/components/layout/BarkaLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatTND } from '@/lib/utils'
import { ShoppingBag, Heart, Search, Menu, X, Package, Truck, ShieldCheck, Star, Plus, Minus, Trash2 } from 'lucide-react'

const mockProducts = [
  { id: '1', name: 'Robe en lin - coupe évasée - beige sable', price: 89.0, compare: 120.0, image: null, category: 'Mode Femmes', featured: true },
  { id: '2', name: 'Support smartphone aluminium pliable - noir', price: 29.9, compare: null, image: null, category: 'Electronics', featured: true },
  { id: '3', name: 'Sac tote coton bio - naturel - 38x42cm', price: 45.0, compare: 60.0, image: null, category: 'Accessoires', featured: true },
  { id: '4', name: 'Set 3 bocaux verre borosilicate - cuisine', price: 59.0, compare: null, image: null, category: 'Maison', featured: false },
  { id: '5', name: 'Huile argan pure pressée à froid - 50ml', price: 35.5, compare: null, image: null, category: 'Beauté', featured: true },
  { id: '6', name: 'Tapis tissé main - laine - 120x180 - écru', price: 199.0, compare: 250.0, image: null, category: 'Maison', featured: true },
]

export function StorefrontPage() {
  const { slug } = useParams()
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Array<{ id: string, qty: number }>>([{ id: '1', qty: 1 }, { id: '3', qty: 2 }])
  const [mobileMenu, setMobileMenu] = useState(false)

  const cartItems = cart.map(c => {
    const p = mockProducts.find(mp => mp.id === c.id)!
    return { ...p, qty: c.qty, total: p.price * c.qty }
  })
  const subtotal = cartItems.reduce((s, i) => s + i.total, 0)
  const delivery = 8
  const total = subtotal + delivery

  const addToCart = (id: string) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === id)
      if (exists) return prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { id, qty: 1 }]
    })
    setCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-ink-900 text-white text-xs py-2 px-4 text-center">
        <span className="inline-flex items-center gap-2">
          <Truck className="h-3.5 w-3.5" /> Livraison partout en Tunisie • Paiement à la livraison • Retour 7 jours
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-ink-100">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to={`/s/${slug}`} className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-ink-900 text-white flex items-center justify-center font-bold text-sm">BE</div>
              <div className="hidden sm:block leading-tight">
                <p className="font-bold text-ink-900">Boutique Élégance</p>
                <p className="text-[11px] text-ink-500 -mt-0.5">{slug}.barka.tn</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink-600">
              <a href="#" className="text-ink-900">Accueil</a>
              <a href="#" className="hover:text-ink-900">Produits</a>
              <a href="#" className="hover:text-ink-900">Catégories</a>
              <a href="#" className="hover:text-ink-900">À propos</a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
                <Input placeholder="Rechercher..." className="pl-9 w-[200px] h-9 rounded-full bg-ink-50 border-ink-100" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full"><Heart className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => setCartOpen(!cartOpen)}>
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-barka-600 text-white text-[11px] font-bold flex items-center justify-center">{cart.reduce((s,c)=>s+c.qty,0)}</span>}
            </Button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-ink-100 bg-white p-4 space-y-3">
            <a href="#" className="block py-2 font-medium">Accueil</a>
            <a href="#" className="block py-2 text-ink-600">Produits</a>
            <a href="#" className="block py-2 text-ink-600">Catégories</a>
            <a href="#" className="block py-2 text-ink-600">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8 lg:py-12">
        <div className="rounded-[2rem] bg-[#f8f5ef] border border-sand-200 overflow-hidden grid lg:grid-cols-2 gap-0">
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-4 bg-white border-sand-200">Nouvelle collection</Badge>
            <h1 className="font-display text-[36px] lg:text-[48px] font-bold leading-[0.9] tracking-tight text-ink-900">
              L'essentiel, <br /><span className="text-sand-800">bien fait</span>
            </h1>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-[440px]">Des produits sélectionnés pour leur qualité et durabilité. Sans superflu, sans modèles - juste le produit, photographié avec soin sur fond neutre.</p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" className="rounded-full bg-ink-900 hover:bg-ink-800 text-white">Découvrir la collection</Button>
              <Button variant="outline" size="lg" className="rounded-full bg-white">Voir lookbook</Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Paiement à la livraison</span>
              <span className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> Livraison 24-72h</span>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-sand-100 to-white min-h-[380px] lg:min-h-[480px] flex items-center justify-center p-8">
            {/* Object-only visual */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[360px]">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl bg-white border border-sand-200 shadow-sm flex items-center justify-center"><Package className="h-10 w-10 text-sand-300" /></div>
                <div className="aspect-square rounded-2xl bg-ink-900 text-white p-4 flex flex-col justify-between">
                  <p className="text-xs opacity-70">Best seller</p>
                  <div><p className="text-[20px] font-bold">-25%</p><p className="text-xs opacity-70">Sur sacs tote</p></div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-white border shadow-sm p-4">
                  <div className="h-full flex flex-col justify-between">
                    <div className="h-16 rounded-xl bg-sand-100 flex items-center justify-center"><Package className="h-6 w-6 text-sand-400" /></div>
                    <div><p className="text-sm font-bold">Livraison offerte</p><p className="text-xs text-ink-500">Dès 150 TND</p></div>
                  </div>
                </div>
                <div className="aspect-[3/4] rounded-2xl bg-white border shadow-sm flex items-center justify-center"><Package className="h-10 w-10 text-ink-300" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-bold tracking-tight">Catégories</h2>
          <Button variant="ghost" size="sm">Voir tout</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Mode Femmes', count: 24, color: 'bg-rose-50 border-rose-100' },
            { name: 'Electronics', count: 18, color: 'bg-blue-50 border-blue-100' },
            { name: 'Maison', count: 32, color: 'bg-amber-50 border-amber-100' },
            { name: 'Beauté', count: 16, color: 'bg-emerald-50 border-emerald-100' },
          ].map(c => (
            <Card key={c.name} className={`${c.color} hover:shadow-md transition-all cursor-pointer group`}>
              <CardContent className="p-5">
                <div className="h-12 w-12 rounded-xl bg-white border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Package className="h-6 w-6 text-ink-400" />
                </div>
                <p className="font-semibold text-ink-900">{c.name}</p>
                <p className="text-xs text-ink-500 mt-1">{c.count} produits</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-bold tracking-tight">Produits en vedette</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">Nouveautés</Button>
            <Button size="sm" className="rounded-full bg-ink-900 text-white">Populaires</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {mockProducts.filter(p=>p.featured).map(product => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all border-ink-100">
              <div className="aspect-[4/3] bg-sand-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-12 w-12 text-sand-300 group-hover:scale-110 transition-transform" />
                </div>
                {product.compare && <Badge className="absolute top-3 left-3 bg-ink-900 text-white">-{Math.round((1-product.price/product.compare)*100)}%</Badge>}
                <Button variant="secondary" size="icon" className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-ink-500">{product.category}</p>
                <h3 className="font-medium text-ink-900 mt-1 leading-tight line-clamp-2 text-sm">{product.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{formatTND(product.price)}</span>
                    {product.compare && <span className="text-xs text-ink-400 line-through">{formatTND(product.compare)}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.8
                  </div>
                </div>
                <Button onClick={() => addToCart(product.id)} className="w-full mt-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white h-9 text-sm">
                  <ShoppingBag className="h-4 w-4" /> Ajouter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-ink-100 flex items-center justify-between">
              <h3 className="font-bold text-[18px]">Panier ({cart.reduce((s,c)=>s+c.qty,0)})</h3>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-20 w-20 rounded-xl bg-sand-50 border flex items-center justify-center shrink-0"><Package className="h-6 w-6 text-sand-300" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight line-clamp-2">{item.name}</p>
                    <p className="text-sm font-bold mt-1">{formatTND(item.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => setCart(prev => prev.map(p => p.id===item.id ? {...p, qty: Math.max(1, p.qty-1)}:p))}><Minus className="h-3 w-3" /></Button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => setCart(prev => prev.map(p => p.id===item.id ? {...p, qty: p.qty+1}:p))}><Plus className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto" onClick={() => setCart(prev => prev.filter(p=>p.id!==item.id))}><Trash2 className="h-4 w-4 text-ink-400" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-ink-100 space-y-4 bg-ink-50/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink-600">Sous-total</span><span className="font-medium">{formatTND(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-ink-600">Livraison</span><span className="font-medium">{formatTND(delivery)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t"><span>Total</span><span>{formatTND(total)}</span></div>
              </div>
              <Link to={`/s/${slug}/checkout`} className="block">
                <Button className="w-full h-12 rounded-full bg-ink-900 hover:bg-ink-800 text-white text-base">Commander • Paiement à la livraison</Button>
              </Link>
              <p className="text-xs text-center text-ink-500">Paiement sécurisé • Livraison 24-72h • Retour 7 jours</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-ink-100 bg-[#fcfcf9]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-ink-900 text-white flex items-center justify-center font-bold text-xs">BE</div>
                <span className="font-bold">Boutique Élégance</span>
              </div>
              <p className="mt-3 text-sm text-ink-600 max-w-[320px]">Boutique propulsée par Barka • Commerce tunisien, sans images humaines, produits objet-only.</p>
            </div>
            <div className="text-sm text-ink-600 space-y-2">
              <p className="font-semibold text-ink-900">Propulsé par</p>
              <div className="flex items-center gap-2"><BarkaLogo size="sm" /> <span className="text-xs">Plateforme SaaS tunisienne</span></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
