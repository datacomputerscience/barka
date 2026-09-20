import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTND(amount: number): string {
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-TN').format(num)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateSKU(): string {
  return `BRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const TUNISIAN_GOVERNORATES = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabès",
  "Medenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kebili",
] as const

export const ORDER_STATUSES = [
  { value: 'pending', label: 'En attente', label_ar: 'قيد الانتظار', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'confirmed', label: 'Confirmée', label_ar: 'مؤكدة', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'preparing', label: 'En préparation', label_ar: 'قيد التحضير', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'shipped', label: 'Expédiée', label_ar: 'تم الشحن', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { value: 'out_for_delivery', label: 'En livraison', label_ar: 'قيد التوصيل', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { value: 'delivered', label: 'Livrée', label_ar: 'تم التوصيل', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { value: 'cancelled', label: 'Annulée', label_ar: 'ملغاة', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'returned', label: 'Retournée', label_ar: 'مرتجعة', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'failed', label: 'Échouée', label_ar: 'فشلت', color: 'bg-gray-100 text-gray-800 border-gray-200' },
] as const
