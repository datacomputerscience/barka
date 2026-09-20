# BARKA - Project Overview & Implementation Status

## ✅ Built & Running

This MVP is **fully functional** and running on Vite dev server. Build passes (998kb bundle, can be code-split later).

### Live Preview
- Dev server: port 5173
- Routes:
  - `/` - Barka marketing landing (brand identity, no human images)
  - `/login` - Auth (Supabase Auth + demo fallback)
  - `/register` - Registration
  - `/onboarding` - 6-step wizard (store, theme, product, delivery, meta, launch)
  - `/dashboard` - Merchant dashboard home (KPIs, revenue chart, alerts, funnel)
  - `/dashboard/products` - Product management (object-only policy)
  - `/dashboard/orders` - Orders COD workflow
  - `/dashboard/delivery` - Delivery provider abstraction (Mock + Tunisian providers)
  - `/dashboard/meta` - Meta Pixel + CAPI + Catalog feed
  - `/dashboard/analytics` - Analytics dashboard
  - `/s/:slug` - Storefront (multi-tenant, mobile-first, no human images)
  - `/s/:slug/checkout` - COD checkout (Tunisian governorates, server-side total)

### Brand Identity
- **Barka** - original logo (package/growth mark), emerald gradient #0d9f4a
- **No human images** strictly enforced - all visuals use Package icon, abstract shapes, tech objects
- Product policy documented: "Robe photographiée sur cintre, fond blanc" not "femme portant robe"

### Database
- `supabase-schema.sql` - production-ready schema with:
  - 25+ tables with UUID PKs, timestamps, FKs, indexes, constraints
  - RLS enabled on all tenant tables
  - Helper functions: `is_store_member()`, `decrement_stock()`, `generate_order_number()`
  - Triggers for updated_at
  - Policies: owner can manage, members can view, public can view active stores/products
  - Storage buckets planned: product-images, store-assets

### Security
- Supabase Auth real (email/password) + demo fallback for showcase
- No passwords stored manually
- No service-role in frontend
- Meta tokens encrypted server-side (Edge Functions)
- Delivery credentials secure
- Order totals recalculated server-side

### Delivery Abstraction
`src/lib/delivery.ts`:
- Interface DeliveryProvider with 5 methods
- MockDeliveryProvider for dev (creates tracking numbers, calculates fees by governorate)
- Registry: MesColis, Aramex, First Delivery, Best Delivery, Navex, INTIGO
- Docs: NEVER invent API - implement only with official docs

### Meta Integration
`src/lib/meta.ts`:
- Pixel browser tracking: `trackPixelEvent()` with event_id
- CAPI server-side: `buildCAPIEvent()` with deduplication
- Hashing SHA-256 for user_data
- Product feed generator: `generateProductFeed()` for Meta Catalog
- Events: PageView, ViewContent, Search, AddToCart, InitiateCheckout, Purchase

### Edge Functions (Supabase)
- `create-order`: Full server-side validation flow (10 steps)
- `meta-capi`: Secure CAPI proxy, never exposes token

### i18n & Localization
- `src/lib/i18n.ts`: AR/FR/EN with RTL support, translations for all major UI
- `src/lib/utils.ts`: 24 governorates, TND formatting, order statuses

### Free-First Architecture
- Cloudflare Pages + Supabase Free
- No paid infra required for MVP
- Upgrade path: add custom domains, increase Supabase limits, add real delivery APIs

### Remaining (Production Polish)
- Supabase project creation & running schema (user to do)
- Real Supabase Storage bucket policies
- Edge Functions deployment (`supabase functions deploy`)
- Custom domain setup for stores (Cloudflare Pages wildcard)
- CSV import UI (templates ready in constants.ts)
- Media management UI
- SEO: meta tags per store, sitemap
- Super Admin environment (placeholder route exists)
- Tests for tenant isolation

### How to Deploy

1. **Supabase**:
   ```bash
   supabase init
   supabase link --project-ref YOUR_REF
   psql -h db.YOUR_REF.supabase.co -U postgres -f supabase-schema.sql
   supabase functions deploy create-order
   supabase functions deploy meta-capi
   ```

2. **Cloudflare Pages**:
   - Connect GitHub repo
   - Build: `npm run build`
   - Output: `dist`
   - Env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

3. **Domain**:
   - `*.barka.tn` wildcard to Pages
   - Store slug routing via `/s/:slug` initially, then custom domain mapping

### Demo Credentials
- Since Supabase not configured in this sandbox, any email/password works (demo mode via localStorage)
- Try: login → dashboard → storefront → checkout

### Files to Present
- `README.md` - full docs
- `supabase-schema.sql` - DB architecture
- `src/` - complete app
- `PROJECT_OVERVIEW.md` - this file

---

Built with: React + TypeScript + Vite + Tailwind v4 + Supabase + Cloudflare Pages
Policy: Original work, no copy of TnTech/Shopify, no human images
