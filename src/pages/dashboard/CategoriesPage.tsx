import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Package, Plus, Edit, Trash2, ChevronRight, FolderTree } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  parent_id: string | null
  product_count: number
  is_active: boolean
  children?: Category[]
}

const mockCategories: Category[] = [
  { id: '1', name: 'Mode', slug: 'mode', parent_id: null, product_count: 42, is_active: true, children: [
    { id: '1-1', name: 'Femmes', slug: 'femmes', parent_id: '1', product_count: 24, is_active: true },
    { id: '1-2', name: 'Hommes', slug: 'hommes', parent_id: '1', product_count: 12, is_active: true },
    { id: '1-3', name: 'Enfants', slug: 'enfants', parent_id: '1', product_count: 6, is_active: true },
  ]},
  { id: '2', name: 'Electronics', slug: 'electronics', parent_id: null, product_count: 28, is_active: true, children: [
    { id: '2-1', name: 'Smartphones', slug: 'smartphones', parent_id: '2', product_count: 8, is_active: true },
    { id: '2-2', name: 'Accessoires', slug: 'accessoires', parent_id: '2', product_count: 20, is_active: true },
  ]},
  { id: '3', name: 'Maison', slug: 'maison', parent_id: null, product_count: 32, is_active: true },
  { id: '4', name: 'Beauté', slug: 'beaute', parent_id: null, product_count: 16, is_active: true, children: [
    { id: '4-1', name: 'Skincare', slug: 'skincare', parent_id: '4', product_count: 10, is_active: true },
    { id: '4-2', name: 'Makeup', slug: 'makeup', parent_id: '4', product_count: 6, is_active: true },
  ]},
]

export function CategoriesPage() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Catégories</h1>
          <p className="text-sm text-ink-600">Organisez vos produits - catégories merchant-specific, RLS isolé</p>
        </div>
        <Button size="sm" onClick={() => { setEditing(null); setOpen(true) }}><Plus className="h-4 w-4" /> Nouvelle catégorie</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-[16px] flex items-center gap-2"><FolderTree className="h-5 w-5" /> Arborescence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockCategories.map(cat => (
              <div key={cat.id} className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-ink-200 hover:border-ink-300 hover:bg-ink-50/50 group transition-all">
                  <div className="h-10 w-10 rounded-xl bg-sand-100 border flex items-center justify-center"><Package className="h-5 w-5 text-sand-800/60" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{cat.name}</p>
                    <p className="text-xs text-ink-500">/{cat.slug} • {cat.product_count} produits</p>
                  </div>
                  <Badge variant={cat.is_active ? 'success' : 'secondary'}>{cat.is_active ? 'Active' : 'Inactive'}</Badge>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(cat); setOpen(true) }}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                {cat.children && (
                  <div className="ml-6 space-y-2 border-l-2 border-ink-100 pl-4">
                    {cat.children.map(child => (
                      <div key={child.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-50 group">
                        <ChevronRight className="h-4 w-4 text-ink-300" />
                        <div className="h-8 w-8 rounded-lg bg-ink-50 border flex items-center justify-center"><Package className="h-4 w-4 text-ink-400" /></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{child.name}</p>
                          <p className="text-xs text-ink-500">{child.product_count} produits</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-[14px]">Statistiques</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-600">Total catégories</span><span className="font-bold">11</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Catégories racines</span><span className="font-bold">4</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Sous-catégories</span><span className="font-bold">7</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Produits non catégorisés</span><span className="font-bold text-amber-600">3</span></div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-sm">
              <p className="font-semibold text-blue-900">Architecture multi-tenant</p>
              <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">Chaque catégorie a store_id avec RLS. Un marchand ne voit jamais les catégories d'un autre. Slug unique par store.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier catégorie' : 'Nouvelle catégorie'}</DialogTitle>
            <DialogDescription>Catégorie merchant-specific, isolée par tenant</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nom</Label><Input placeholder="Mode Femmes" defaultValue={editing?.name} /></div>
            <div className="space-y-2"><Label>Slug</Label><Input placeholder="femmes" defaultValue={editing?.slug} /></div>
            <div className="space-y-2"><Label>Catégorie parente (optionnel)</Label><Input placeholder="Laisser vide pour racine" /></div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Annuler</Button>
              <Button className="flex-1" onClick={() => setOpen(false)}>Sauvegarder</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
