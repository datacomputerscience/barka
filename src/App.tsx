import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage, RegisterPage } from '@/pages/auth/AuthPage'
import { OnboardingWizard } from '@/pages/onboarding/OnboardingWizard'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardHome } from '@/pages/dashboard/DashboardHome'
import { ProductsPage } from '@/pages/dashboard/ProductsPage'
import { OrdersPage } from '@/pages/dashboard/OrdersPage'
import { MetaPage } from '@/pages/dashboard/MetaPage'
import { DeliveryPage } from '@/pages/dashboard/DeliveryPage'
import { AnalyticsPage } from '@/pages/dashboard/AnalyticsPage'
import { CategoriesPage } from '@/pages/dashboard/CategoriesPage'
import { InventoryPage } from '@/pages/dashboard/InventoryPage'
import { CustomersPage } from '@/pages/dashboard/CustomersPage'
import { CouponsPage } from '@/pages/dashboard/CouponsPage'
import { MarketingPage } from '@/pages/dashboard/MarketingPage'
import { LandingPagesPage } from '@/pages/dashboard/LandingPagesPage'
import { StoreDesignPage } from '@/pages/dashboard/StoreDesignPage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
import { PaymentsPage } from '@/pages/dashboard/PaymentsPage'
import { SuperAdminPage } from '@/pages/superadmin/SuperAdminPage'
import { HelpPage } from '@/pages/HelpPage'
import { StorefrontPage } from '@/pages/storefront/StorefrontPage'
import { CheckoutPage } from '@/pages/storefront/CheckoutPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/help" element={<HelpPage />} />

        <Route path="/s/:slug" element={<StorefrontPage />} />
        <Route path="/s/:slug/checkout" element={<CheckoutPage />} />
        <Route path="/s/demo" element={<StorefrontPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute><DashboardLayout><ProductsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute><DashboardLayout><OrdersPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/categories" element={<ProtectedRoute><DashboardLayout><CategoriesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/inventory" element={<ProtectedRoute><DashboardLayout><InventoryPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/customers" element={<ProtectedRoute><DashboardLayout><CustomersPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/marketing" element={<ProtectedRoute><DashboardLayout><MarketingPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/coupons" element={<ProtectedRoute><DashboardLayout><CouponsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/landing-pages" element={<ProtectedRoute><DashboardLayout><LandingPagesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/delivery" element={<ProtectedRoute><DashboardLayout><DeliveryPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/payments" element={<ProtectedRoute><DashboardLayout><PaymentsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/meta" element={<ProtectedRoute><DashboardLayout><MetaPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/design" element={<ProtectedRoute><DashboardLayout><StoreDesignPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />

        <Route path="/superadmin" element={<ProtectedRoute><DashboardLayout><SuperAdminPage /></DashboardLayout></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
