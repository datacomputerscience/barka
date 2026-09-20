export type Language = 'ar' | 'fr' | 'en'

export const languages = {
  ar: { name: 'العربية', nativeName: 'العربية', dir: 'rtl' as const, flag: '🇹🇳' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr' as const, flag: '🇫🇷' },
  en: { name: 'English', nativeName: 'English', dir: 'ltr' as const, flag: '🇬🇧' },
}

type TranslationDict = Record<string, string>

const translations: Record<Language, TranslationDict> = {
  en: {
    // Landing
    'landing.hero.title': 'Build your Tunisian online store in minutes',
    'landing.hero.subtitle': 'Barka is the all-in-one e-commerce platform built for Tunisia. COD, local delivery, Meta tracking — everything you need to sell online.',
    'landing.hero.cta': 'Start selling free',
    'landing.hero.demo': 'View demo store',
    'landing.features.title': 'Everything you need to grow',
    'landing.features.subtitle': 'Built for Tunisian merchants, by people who understand local commerce',
    'landing.pricing.title': 'Simple pricing for every stage',
    
    // Auth
    'auth.login': 'Log in',
    'auth.register': 'Create account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgot': 'Forgot password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.orders': 'Orders',
    'dashboard.products': 'Products',
    'dashboard.categories': 'Categories',
    'dashboard.inventory': 'Inventory',
    'dashboard.customers': 'Customers',
    'dashboard.marketing': 'Marketing',
    'dashboard.coupons': 'Coupons',
    'dashboard.landingPages': 'Landing Pages',
    'dashboard.delivery': 'Delivery',
    'dashboard.payments': 'Payments',
    'dashboard.meta': 'Meta Integration',
    'dashboard.analytics': 'Analytics',
    'dashboard.storeDesign': 'Store Design',
    'dashboard.settings': 'Settings',
    
    // Storefront
    'storefront.addToCart': 'Add to cart',
    'storefront.buyNow': 'Buy now',
    'storefront.cart': 'Cart',
    'storefront.checkout': 'Checkout',
    'storefront.subtotal': 'Subtotal',
    'storefront.delivery': 'Delivery',
    'storefront.total': 'Total',
    'storefront.cod': 'Cash on Delivery',
  },
  fr: {
    'landing.hero.title': 'Créez votre boutique en ligne tunisienne en quelques minutes',
    'landing.hero.subtitle': 'Barka est la plateforme e-commerce tout-en-un conçue pour la Tunisie. Paiement à la livraison, livraison locale, tracking Meta — tout ce dont vous avez besoin pour vendre en ligne.',
    'landing.hero.cta': 'Commencer gratuitement',
    'landing.hero.demo': 'Voir boutique démo',
    'landing.features.title': 'Tout ce dont vous avez besoin pour grandir',
    'landing.features.subtitle': 'Conçu pour les commerçants tunisiens, par des gens qui comprennent le commerce local',
    'landing.pricing.title': 'Tarification simple pour chaque étape',
    
    'auth.login': 'Se connecter',
    'auth.register': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.forgot': 'Mot de passe oublié ?',
    'auth.noAccount': "Vous n'avez pas de compte ?",
    'auth.hasAccount': 'Vous avez déjà un compte ?',
    
    'dashboard.title': 'Tableau de bord',
    'dashboard.orders': 'Commandes',
    'dashboard.products': 'Produits',
    'dashboard.categories': 'Catégories',
    'dashboard.inventory': 'Inventaire',
    'dashboard.customers': 'Clients',
    'dashboard.marketing': 'Marketing',
    'dashboard.coupons': 'Coupons',
    'dashboard.landingPages': 'Pages d\'atterrissage',
    'dashboard.delivery': 'Livraison',
    'dashboard.payments': 'Paiements',
    'dashboard.meta': 'Intégration Meta',
    'dashboard.analytics': 'Analytiques',
    'dashboard.storeDesign': 'Design boutique',
    'dashboard.settings': 'Paramètres',
    
    'storefront.addToCart': 'Ajouter au panier',
    'storefront.buyNow': 'Acheter maintenant',
    'storefront.cart': 'Panier',
    'storefront.checkout': 'Commander',
    'storefront.subtotal': 'Sous-total',
    'storefront.delivery': 'Livraison',
    'storefront.total': 'Total',
    'storefront.cod': 'Paiement à la livraison',
  },
  ar: {
    'landing.hero.title': 'أنشئ متجرك الإلكتروني التونسي في دقائق',
    'landing.hero.subtitle': 'بركة هي منصة التجارة الإلكترونية الشاملة المصممة لتونس. الدفع عند الاستلام، التوصيل المحلي، تتبع ميتا — كل ما تحتاجه للبيع عبر الإنترنت.',
    'landing.hero.cta': 'ابدأ البيع مجاناً',
    'landing.hero.demo': 'عرض متجر تجريبي',
    'landing.features.title': 'كل ما تحتاجه للنمو',
    'landing.features.subtitle': 'مصمم للتجار التونسيين، من قبل أشخاص يفهمون التجارة المحلية',
    'landing.pricing.title': 'تسعير بسيط لكل مرحلة',
    
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgot': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    
    'dashboard.title': 'لوحة التحكم',
    'dashboard.orders': 'الطلبات',
    'dashboard.products': 'المنتجات',
    'dashboard.categories': 'الفئات',
    'dashboard.inventory': 'المخزون',
    'dashboard.customers': 'العملاء',
    'dashboard.marketing': 'التسويق',
    'dashboard.coupons': 'القسائم',
    'dashboard.landingPages': 'صفحات الهبوط',
    'dashboard.delivery': 'التوصيل',
    'dashboard.payments': 'المدفوعات',
    'dashboard.meta': 'تكامل ميتا',
    'dashboard.analytics': 'التحليلات',
    'dashboard.storeDesign': 'تصميم المتجر',
    'dashboard.settings': 'الإعدادات',
    
    'storefront.addToCart': 'أضف إلى السلة',
    'storefront.buyNow': 'اشتر الآن',
    'storefront.cart': 'السلة',
    'storefront.checkout': 'إتمام الطلب',
    'storefront.subtotal': 'المجموع الفرعي',
    'storefront.delivery': 'التوصيل',
    'storefront.total': 'المجموع',
    'storefront.cod': 'الدفع عند الاستلام',
  },
}

export function t(key: string, lang: Language = 'fr'): string {
  return translations[lang]?.[key] || translations['fr'][key] || key
}

export function useTranslation(lang: Language) {
  return {
    t: (key: string) => t(key, lang),
    lang,
    dir: languages[lang].dir,
  }
}
