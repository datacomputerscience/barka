/**
 * Barka Constants - Tunisian E-commerce SaaS
 */

export const BARKA_BRAND = {
  name: 'Barka',
  arabic: 'بركة',
  tagline: 'Commerce Tunisien',
  description: 'Plateforme e-commerce tout-en-un pour la Tunisie',
  colors: {
    primary: '#0d9f4a',
    primaryDark: '#0a7a38',
    sand: '#f9f6ef',
    ink: '#111827',
  },
  logo: {
    // Original abstract package/growth mark
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/><path d="M2 17L12 22L22 17" stroke="white" stroke-width="2"/><path d="M2 12L12 17L22 12" stroke="white" stroke-width="2"/></svg>`,
  },
}

export const BARKA_THEMES = [
  {
    id: 'modern',
    name: 'Modern Store',
    description: 'Épuré & premium, sans images humaines',
    preview: 'abstract-commerce',
    colors: { primary: '#0d9f4a', background: '#ffffff' },
  },
  {
    id: 'fashion',
    name: 'Fashion Product Store',
    description: 'Produits sur fond neutre, pas de modèles',
    preview: 'product-flatlay',
    colors: { primary: '#111827', background: '#fdfcf8' },
  },
  {
    id: 'electronics',
    name: 'Electronics Store',
    description: 'Tech & gadgets, objets seulement',
    preview: 'tech-objects',
    colors: { primary: '#0d9f4a', background: '#f8f8f9' },
  },
  {
    id: 'beauty',
    name: 'Beauty Product Store',
    description: 'Cosmétiques objet-only, packaging',
    preview: 'beauty-objects',
    colors: { primary: '#ec4899', background: '#fdf2f8' },
  },
  {
    id: 'home',
    name: 'Home & Lifestyle',
    description: 'Maison & déco, sans personnes',
    preview: 'home-objects',
    colors: { primary: '#d97706', background: '#fffbeb' },
  },
]

export const NO_HUMAN_IMAGES_POLICY = `
STRICT NO-HUMAN-IMAGES POLICY:
- No men, women, children, faces, silhouettes, figures, models
- No lifestyle photography containing people
- No AI-generated people
- Applies to: homepage, hero, banners, products, categories, marketing, login, onboarding, dashboard, empty states, help, demo store

APPROVED VISUALS:
- Products on neutral background
- Packages, boxes, shopping carts
- Smartphones, laptops, tech
- Abstract shapes, geometric illustrations, icons
- Tunisian architecture without people, landscapes without people, storefronts without people, warehouses without visible people, vehicles without visible people
`

export const CSV_TEMPLATES = {
  products: `name,slug,description,sku,price,compare_at_price,stock_quantity,status,category
"Robe lin beige","robe-lin-beige","Robe en lin coupe évasée photographiée sur cintre fond blanc","BRK-LIN01",89.000,120.000,24,active,"Mode Femmes"
"Support smartphone aluminium","support-smartphone-alu","Support pliable aluminium noir sur bureau blanc","BRK-TECH02",29.900,,50,active,"Electronics"`,
  categories: `name,slug,parent_slug,description
"Mode","mode",,"Collection mode"
"Femmes","femmes","mode","Mode femmes"
"Electronics","electronics",,"Appareils électroniques"`,
}
