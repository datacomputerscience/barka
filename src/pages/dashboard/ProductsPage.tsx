import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { formatTND, generateSKU } from '@/lib/utils'
import { CSVImporter } from '@/components/dashboard/CSVImporter'
import { Package, Search, Plus, Edit, Trash2, Eye, Upload, X, Image as ImageIcon } from 'lucide-react'

const mockProducts = [
  { id: '1', name: 'Robe en lin - coupe évasée - beige', sku: 'BRK-LIN01', price: 89.0, compare: 120, stock: 24, status: 'active', image: null, category: 'Mode Femmes', description: 'Robe en lin coupe évasée photographiée sur cintre fond blanc, lumière naturelle' },
  { id: '2', name: 'Support smartphone aluminium - pliable', sku: 'BRK-TECH02', price: 29.9, compare: null, stock: 3, status: 'active', image: null, category: 'Electronics', description: 'Support pliable aluminium noir sur bureau blanc' },
  { id: '3', name: 'Sac tote coton bio - naturel', sku: 'BRK-BAG03', price: 45.0, compare: 60, stock: 28, status: 'active', image: null, category: 'Accessoires', description: 'Sac tote posé sur table bois clair, lumière naturelle, objet-only' },
  { id: '4', name: 'Set 3 bocaux verre - cuisine', sku: 'BRK-HOME04', price: 59.0, compare: null, stock: 0, status: 'out_of_stock', image: null, category: 'Maison', description: 'Set bocaux verre borosilicate sur étagère cuisine' },
  { id: '5', name: 'Huile argan pure - 50ml', sku: 'BRK-BEA05', price: 35.5, compare: null, stock: 42, status: 'draft', image: null, category: 'Beauté', description: 'Flacon huile argan sur fond neutre beige, packaging' },
]

export function ProductsPage() {
  const [search, setSearch] = useState('')
  const [showCSV, setShowCSV] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Produits</h1>
          <p className="text-sm text-ink-600">Gérez votre catalogue - photos objet-only, sans modèles humains</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCSV(!showCSV)}><Upload className="h-4 w-4" /> {showCSV ? 'Fermer import' : 'Importer CSV'}</Button>
          <Button size="sm" onClick={() => { setEditingProduct(null); setShowProductForm(true) }}><Plus className="h-4 w-4" /> Nouveau produit</Button>
        </div>
      </div>

      {showCSV && <CSVImporter type="products" />}

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
              <Input placeholder="Rechercher produits..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filtres</Button>
              <Button variant="outline" size="sm">Trier</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-100 bg-ink-50/50 text-xs text-ink-500">
                <tr>
                  <th className="text-left p-4 font-medium">Produit</th>
                  <th className="text-left p-4 font-medium">SKU</th>
                  <th className="text-left p-4 font-medium">Prix</th>
                  <th className="text-left p-4 font-medium">Stock</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-sand-100 border flex items-center justify-center shrink-0">
                          <Package className="h-5 w-5 text-sand-800/50" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate max-w-[280px]">{p.name}</p>
                          <p className="text-xs text-ink-500">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-mono text-ink-600">{p.sku}</td>
                    <td className="p-4">
                      <div><span className="text-sm font-bold">{formatTND(p.price)}</span>{p.compare && <span className="text-xs text-ink-400 line-through ml-1">{formatTND(p.compare)}</span>}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{p.stock}</span>
                        {p.stock < 5 && p.stock > 0 && <Badge variant="warning">Faible</Badge>}
                        {p.stock === 0 && <Badge variant="destructive">Rupture</Badge>}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={p.status === 'active' ? 'success' : p.status === 'draft' ? 'secondary' : 'destructive'} className="capitalize">
                        {p.status === 'active' ? 'Actif' : p.status === 'draft' ? 'Brouillon' : 'Rupture'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingProduct(p); setShowProductForm(true) }}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm">
        <p className="font-medium text-blue-900">Rappel politique images Barka</p>
        <p className="text-blue-700 mt-1 text-xs leading-relaxed">Tous les produits doivent être photographiés sans modèles humains. Utilisez fond neutre, cintre, mannequin invisible ou flat lay. Ex: "Sac tote posé sur table bois clair, lumière naturelle". Pas de femmes/hommes/enfants, pas de silhouettes. Stock géré via inventory table avec mouvements, pas state frontend.</p>
      </div>

      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-[720px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Modifier produit' : 'Nouveau produit'}</DialogTitle>
            <DialogDescription>Produit objet-only, tenant-isolé, RLS. Photos sans modèles humains.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variantes</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="space-y-4 mt-4">
                <div className="space-y-2"><Label>Nom produit *</Label><Input defaultValue={editingProduct?.name} placeholder="Robe en lin - coupe évasée - beige sable" /><p className="text-xs text-ink-400">Décrivez produit, pas personne qui le porte</p></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Slug</Label><Input defaultValue={editingProduct?.name?.toLowerCase().replace(/\s+/g, '-')} placeholder="robe-lin-beige" /></div>
                  <div className="space-y-2"><Label>Catégorie</Label><Select defaultValue="Mode Femmes"><option>Mode Femmes</option><option>Electronics</option><option>Maison</option><option>Beauté</option></Select></div>
                </div>
                <div className="space-y-2"><Label>Description courte</Label><Input placeholder="Robe en lin..." /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={editingProduct?.description} placeholder="Décrivez matériaux, dimensions, entretien - pas modèle humain" rows={3} /></div>
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Prix (TND) *</Label><Input type="number" defaultValue={editingProduct?.price} placeholder="89.000" /></div>
                  <div className="space-y-2"><Label>Prix comparé</Label><Input type="number" placeholder="120.000" /></div>
                  <div className="space-y-2"><Label>Prix coût</Label><Input type="number" placeholder="45.000" /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>SKU</Label><Input defaultValue={editingProduct?.sku || generateSKU()} /></div>
                  <div className="space-y-2"><Label>Stock</Label><Input type="number" defaultValue={editingProduct?.stock} /></div>
                  <div className="space-y-2"><Label>Seuil alerte</Label><Input type="number" defaultValue="5" /></div>
                </div>
                <div className="space-y-2"><Label>Statut</Label><Select defaultValue={editingProduct?.status || 'draft'}><option value="draft">Brouillon</option><option value="active">Actif</option><option value="out_of_stock">Rupture</option><option value="archived">Archivé</option></Select></div>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-ink-200 rounded-xl p-6 text-center">
                  <ImageIcon className="h-8 w-8 text-ink-400 mx-auto" />
                  <p className="text-sm font-medium mt-2">Images produit - objet-only</p>
                  <p className="text-xs text-ink-500 mt-1">PNG, JPG max 5MB - organisé par store_id/ - Supabase Storage</p>
                  <p className="text-xs text-amber-700 mt-2">⚠️ Pas de modèles humains. Fond neutre, cintre, flat lay.</p>
                  <Button variant="outline" size="sm" className="mt-3">Ajouter images</Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-sand-100 border flex items-center justify-center relative">
                      <Package className="h-6 w-6 text-sand-800/50" />
                      <button className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants">
              <div className="space-y-4 mt-4">
                <p className="text-sm text-ink-600">Variantes: tailles, couleurs, matériaux - chaque variante a SKU et stock séparé</p>
                <div className="space-y-2">
                  {[
                    { name: 'Beige - S', sku: 'BRK-LIN01-BE-S', stock: 5, price: 89 },
                    { name: 'Beige - M', sku: 'BRK-LIN01-BE-M', stock: 12, price: 89 },
                    { name: 'Beige - L', sku: 'BRK-LIN01-BE-L', stock: 7, price: 89 },
                  ].map(v => (
                    <div key={v.sku} className="flex items-center gap-3 p-3 rounded-xl border">
                      <div className="flex-1"><p className="text-sm font-medium">{v.name}</p><p className="text-xs font-mono text-ink-500">{v.sku}</p></div>
                      <span className="text-sm">Stock: {v.stock}</span>
                      <span className="text-sm font-bold">{v.price} TND</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full"><Plus className="h-4 w-4" /> Ajouter variante</Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 pt-4 border-t mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setShowProductForm(false)}>Annuler</Button>
            <Button className="flex-1" onClick={() => setShowProductForm(false)}>Sauvegarder produit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
