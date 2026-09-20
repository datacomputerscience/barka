import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tags, 
  Boxes, 
  Users, 
  Megaphone, 
  Ticket, 
  LayoutTemplate,
  Truck,
  CreditCard,
  BarChart3,
  Palette,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Store,
  ChevronDown
} from 'lucide-react'
import { Facebook } from '@/components/icons'
import { BarkaLogo } from './BarkaLogo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Commandes', href: '/dashboard/orders', icon: ShoppingBag, badge: '12' },
  { name: 'Produits', href: '/dashboard/products', icon: Package },
  { name: 'Catégories', href: '/dashboard/categories', icon: Tags },
  { name: 'Inventaire', href: '/dashboard/inventory', icon: Boxes },
  { name: 'Clients', href: '/dashboard/customers', icon: Users },
  { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
  { name: 'Coupons', href: '/dashboard/coupons', icon: Ticket },
  { name: 'Landing Pages', href: '/dashboard/landing-pages', icon: LayoutTemplate },
  { name: 'Livraison', href: '/dashboard/delivery', icon: Truck },
  { name: 'Paiements', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Meta', href: '/dashboard/meta', icon: Facebook, highlight: true },
  { name: 'Analytiques', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Design', href: '/dashboard/design', icon: Palette },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const currentStore = {
    name: 'Boutique Élégance',
    slug: 'boutique-elegance',
    logo: null,
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-ink-900/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-ink-200 flex flex-col transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-[64px] px-5 flex items-center justify-between border-b border-ink-100">
          <BarkaLogo size="sm" />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-3 rounded-xl bg-sand-50 border border-sand-200 p-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-sand-200 flex items-center justify-center">
              <Store className="h-5 w-5 text-sand-800" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900 truncate">{currentStore.name}</p>
              <p className="text-xs text-ink-500 truncate">{currentStore.slug}.barka.tn</p>
            </div>
            <ChevronDown className="h-4 w-4 text-ink-400" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-hide">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive 
                    ? "bg-barka-50 text-barka-700 border border-barka-200" 
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                  (item as any).highlight && !isActive && "bg-blue-50/50 text-blue-700 border border-blue-100"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-barka-600" : "text-ink-400 group-hover:text-ink-600")} />
                <span className="flex-1">{item.name}</span>
                {(item as any).badge && (
                  <span className="ml-auto bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {(item as any).badge}
                  </span>
                )}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-ink-100">
            <Link to="/help" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900">
              <HelpCircle className="h-[18px] w-[18px] text-ink-400" />
              Aide & Documentation
            </Link>
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900">
              <LogOut className="h-[18px] w-[18px] text-ink-400" />
              Déconnexion
            </button>
          </div>
        </nav>

        <div className="p-3">
          <div className="rounded-xl bg-gradient-to-br from-barka-600 to-barka-800 p-4 text-white">
            <p className="text-sm font-semibold">Besoin d'aide pour Meta ?</p>
            <p className="text-xs text-barka-100 mt-1">Configurez Pixel & CAPI pour booster vos ventes</p>
            <Button size="sm" variant="secondary" className="mt-3 w-full bg-white text-barka-700 hover:bg-barka-50 text-xs h-8">
              Configurer Meta
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:pl-[280px]">
        <div className="sticky top-0 z-30 h-[64px] bg-white/80 backdrop-blur-xl border-b border-ink-200 flex items-center gap-4 px-4 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-ink-400">Boutique</span>
              <span className="text-ink-300">/</span>
              <span className="font-medium text-ink-900 capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/s/${currentStore.slug}`} target="_blank" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm">
                <Store className="h-4 w-4" />
                Voir boutique
              </Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-barka-100 border border-barka-200 flex items-center justify-center text-barka-700 font-bold text-xs">
              BE
            </div>
          </div>
        </div>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
