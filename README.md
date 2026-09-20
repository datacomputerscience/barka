# Barka — Tunisian Multi-Tenant E-Commerce SaaS

**Barka** (بركة - blessing/abundance) is a professional, production-oriented, multi-tenant e-commerce SaaS platform designed primarily for the Tunisian market.

> Original platform, functionally inspired by modern Tunisian SaaS but with independent architecture, codebase, and brand identity.

## 🌟 Vision

Allow Tunisian merchants to create and operate online stores without building from scratch:

- Account & store creation wizard
- Product & category management (no human models - object-only policy)
- Real inventory with movements & low-stock alerts
- COD-first checkout (Tunisian-friendly)
- Delivery abstraction for MesColis, Aramex, First Delivery, etc.
- Meta Pixel + Conversions API with deduplication
- Analytics tenant-isolated
- Store designer with original themes
- FR / AR (RTL) / EN + TND + 24 governorates

## 🏗️ Architecture

### Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Hosting**: Cloudflare Pages (free-first)
- **DB**: PostgreSQL with Row Level Security (RLS) for multi-tenancy

### Free-First
- Cloudflare Pages + Supabase Free tier
- Upgrade path without rewrite
- No vendor lock-in

### Multi-Tenancy
- Tenant isolation at: DB (RLS), API, auth, storage, routing
- Every table has `store_id` / `tenant_id`
- RLS policies: `is_store_member(store_id)` check
- Storage organized by `store_id/*`

### Database Schema
See `supabase-schema.sql` - 25+ tables:
`profiles, stores, store_members, products, product_variants, categories, inventory, orders, order_items, customers, delivery_providers, shipments, meta_integrations, meta_events, coupons, campaigns, landing_pages, analytics_events, media, audit_logs` etc.

- UUID PKs, `created_at`/`updated_at`, FKs, indexes, constraints
- Triggers: `updated_at`, order number generation
- Functions: `decrement_stock()`, `is_store_member()`

## 🔒 Security

- Supabase Auth (never manual password storage)
- RLS on all tenant tables
- Service-role never exposed to frontend
- Meta access tokens encrypted server-side (Edge Functions)
- Delivery credentials via Supabase Vault
- Server-side order validation (never trust browser totals)

## 🎨 Brand Identity

- **Name**: Barka
- **Logo**: Original abstract package/growth mark, gradient emerald
- **Colors**: Barka green #0d9f4a, sand, ink
- **Fonts**: Inter + Plus Jakarta Sans (display) + IBM Plex Arabic
- **Visual Policy**: STRICT NO-HUMAN-IMAGES
  - No men/women/children/faces/silhouettes/models/lifestyle with people
  - Use: products, packages, boxes, smartphones, laptops, abstract shapes, Tunisian architecture without people, maps, icons

## 🛒 Storefront

Pages: Home, Products, Categories, Product Details, Search, Cart, Checkout, Order Confirmation, About, Contact, Privacy, Terms, Shipping, Refund

- Responsive mobile-first (Tunisian customers mobile-heavy)
- SEO-friendly
- Object-only photography policy enforced

## 📦 Product Management

- Simple & variable products, sizes, colors, SKU, stock, sale price
- Statuses: draft, active, out_of_stock, archived
- Search, filters, pagination, sorting

## 💰 Checkout & COD

Fields: first name, last name, phone, email optional, governorate, city, delegation, address, additional info

Payment: Cash on Delivery first-class

Order statuses: pending → confirmed → preparing → shipped → out_for_delivery → delivered / cancelled / returned / failed + history

Server-side flow:
1. Validate cart server-side
2. Check availability
3. Retrieve current prices from DB
4. Calculate subtotal/discounts/delivery server-side
5. Create order + items
6. Update inventory safely (FOR UPDATE)
7. Status history
8. Analytics
9. Meta Purchase event with event_id deduplication
10. Confirmation

## 🚚 Delivery Abstraction

```ts
interface DeliveryProvider {
  createShipment(order): Promise<{tracking_number, response}>
  getShipment(tracking)
  trackShipment(tracking)
  cancelShipment(tracking)
  calculateDeliveryFee(params)
  validateCredentials(creds)
}
```

Providers: MesColis, Aramex, First Delivery, Best Delivery, Navex, INTIGO

- Real API only when docs + credentials available
- Otherwise `MockDeliveryProvider` with warning
- Credentials secure, never frontend

## 📈 Meta Integration

Dedicated section:

- Pixel ID, Dataset ID, Catalog ID, Access Token (encrypted), Test Event Code
- Events: PageView, ViewContent, Search, AddToCart, InitiateCheckout, Purchase, AddPaymentInfo, Lead
- CAPI architecture:
  - `event_id` for browser/server deduplication
  - `user_data` hashed SHA-256 server-side
  - `custom_data` with value, currency, content_ids
  - `action_source: website`
  - Never expose token in browser

Product Feed:
- `id, title, description, availability, condition, price, link, image_link, brand, category`
- Dynamic endpoint `/api/feed/meta` tenant-isolated

## 📊 Analytics

Revenue, Orders, AOV, Conversion, Visitors, Product Views, Add to Cart, Checkout, Purchases, Abandoned Carts

Charts: revenue over time, orders, top products, categories, status distribution

## 🎨 Store Designer

Customizable: logo, favicon, primary/secondary color, font, homepage sections, hero, featured products, footer, social links

Themes (original, no people):
- Modern Store
- Fashion Product Store (products on neutral background)
- Electronics Store
- Beauty Product Store (object-only)
- Home & Lifestyle

## 🌍 i18n & Localization

- AR (RTL), FR (LTR), EN (LTR)
- Proper i18n system, not hardcoded
- Default: Tunisia, TND
- 24 governorates with expandable city/delegation

## 📥 CSV Import

Workflow: Upload → Preview → Validate → Errors → Dry run → Confirm → Import

Templates for products & categories

## 🗂️ Media

Supabase Storage: product images, logos, banners, organized by tenant

Validation: file type, size, tenant isolation

## 🚀 Getting Started

```bash
npm install
cp .env.example .env
# Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

### Supabase Setup
1. Create Supabase project
2. Run `supabase-schema.sql` in SQL editor
3. Create buckets: `product-images` (public), `store-assets` (public)
4. Configure Auth: email/password, enable email verification
5. Deploy Edge Functions for:
   - Order creation (server-side validation)
   - Meta CAPI proxy
   - Delivery provider proxy
   - Product feed

### Cloudflare Pages
- Build command: `npm run build`
- Output: `dist`
- Env vars: Supabase URL + anon key

## 📂 Project Structure

```
src/
  components/
    ui/ (button, card, input, etc)
    layout/ (BarkaLogo, DashboardLayout)
    storefront/
    dashboard/
  lib/
    supabase.ts
    utils.ts (formatTND, governorates, order statuses)
    i18n.ts
    delivery.ts (provider abstraction)
    meta.ts (Pixel + CAPI)
  pages/
    landing/
    auth/
    onboarding/
    dashboard/
    storefront/
    superadmin/
  hooks/
  types/
```

## 🔐 Roles

SUPER_ADMIN, STORE_OWNER, STORE_ADMIN, STORE_MANAGER, STORE_EDITOR, CUSTOMER

Permissions enforced server-side + RLS, not just UI hiding.

## 📜 License

Original work. No copy of TnTech, Shopify, etc. source, design, assets.

© 2026 Barka
