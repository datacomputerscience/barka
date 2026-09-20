import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BARKA_THEMES } from '@/lib/constants'
import { Palette, Eye, Upload, Check } from 'lucide-react'

export function StoreDesignPage() {
  const [activeTheme, setActiveTheme] = useState('modern')
  const [primaryColor, setPrimaryColor] = useState('#0d9f4a')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Design Boutique</h1>
          <p className="text-sm text-ink-600">Thèmes originaux sans personnes, customisation visuelle</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> Aperçu</Button>
          <Button size="sm">Publier</Button>
        </div>
      </div>

      <Tabs defaultValue="themes">
        <TabsList>
          <TabsTrigger value="themes">Thèmes</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="homepage">Page d'accueil</TabsTrigger>
          <TabsTrigger value="custom">Personnalisation</TabsTrigger>
        </TabsList>

        <TabsContent value="themes">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BARKA_THEMES.map(theme => (
              <Card key={theme.id} className={`cursor-pointer transition-all hover:shadow-lg ${activeTheme === theme.id ? 'border-barka-300 ring-2 ring-barka-200' : 'border-ink-200'}`} onClick={() => setActiveTheme(theme.id)}>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-sand-50 to-ink-50 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <Palette className="h-10 w-10 text-ink-300" />
                    {activeTheme === theme.id && <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-barka-600 text-white flex items-center justify-center"><Check className="h-4 w-4" /></div>}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{theme.name}</p>
                    <p className="text-xs text-ink-500 mt-1 leading-relaxed">{theme.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border" style={{ background: theme.colors.primary }} />
                      <div className="h-4 w-4 rounded-full border" style={{ background: theme.colors.background }} />
                      <Badge variant="secondary" className="ml-auto text-[10px]">Sans personnes</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-amber-50 border-amber-200">
            <CardContent className="p-4 flex gap-3 text-sm">
              <Palette className="h-5 w-5 text-amber-700 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900">Politique visuelle Barka</p>
                <p className="text-amber-800/80 text-xs mt-1 leading-relaxed">Tous les thèmes sont originaux, premium, sans images humaines. Utilisez produits sur fond neutre, packaging, objets tech, illustrations abstraites. Pas de femmes/hommes/enfants, pas de silhouettes. Exemple Fashion: "Robe sur cintre, fond blanc" pas "femme portant robe".</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-[16px]">Logo & Favicon</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo boutique</Label>
                  <div className="border-2 border-dashed border-ink-200 rounded-xl p-6 text-center">
                    <Upload className="h-8 w-8 text-ink-400 mx-auto" />
                    <p className="text-sm text-ink-600 mt-2">Glissez logo ici ou cliquez</p>
                    <p className="text-xs text-ink-400 mt-1">PNG, JPG, SVG max 2MB - organisé par tenant store_id/</p>
                    <Button variant="outline" size="sm" className="mt-3">Choisir fichier</Button>
                  </div>
                </div>
                <div className="space-y-2"><Label>Favicon</Label><Input type="file" /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-[16px]">Couleurs & Typographie</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Couleur primaire</Label>
                    <div className="flex gap-2">
                      <Input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-10 w-16 p-1" />
                      <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2"><Label>Couleur secondaire</Label><Input type="color" defaultValue="#f9f6ef" className="h-10" /></div>
                </div>
                <div className="space-y-2"><Label>Police</Label><Input defaultValue="Inter" /></div>
                <div className="rounded-xl bg-ink-50 border p-3">
                  <p className="text-xs font-medium mb-2">Aperçu</p>
                  <div className="h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: primaryColor }}>Boutique Élégance</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Sections page d'accueil</CardTitle>
              <CardDescription>Builder visuel simple - hero, catégories, produits vedette, offres</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 'hero', name: 'Hero Banner', desc: 'Titre, sous-titre, CTA, image produit/packaging (pas humain)', enabled: true },
                { id: 'categories', name: 'Catégories vedette', desc: '4-6 catégories avec icônes objets', enabled: true },
                { id: 'featured', name: 'Produits vedette', desc: 'Grille produits, objet-only', enabled: true },
                { id: 'offers', name: 'Offres spéciales', desc: 'Bannière promotionnelle', enabled: true },
                { id: 'new', name: 'Nouveautés', desc: 'Derniers produits ajoutés', enabled: false },
                { id: 'trust', name: 'Confiance & FAQ', desc: 'Livraison, retours, garanties', enabled: true },
              ].map(section => (
                <div key={section.id} className="flex items-center gap-3 p-3 rounded-xl border border-ink-200">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${section.enabled ? 'bg-barka-50 text-barka-600' : 'bg-ink-50 text-ink-400'}`}>
                    <Palette className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.name}</p>
                    <p className="text-xs text-ink-500">{section.desc}</p>
                  </div>
                  <Badge variant={section.enabled ? 'success' : 'secondary'}>{section.enabled ? 'Activé' : 'Désactivé'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader><CardTitle className="text-[16px]">Personnalisation avancée</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>CSS personnalisé (optionnel)</Label><textarea className="w-full min-h-[100px] rounded-xl border border-ink-200 p-3 text-sm font-mono" placeholder="/* Votre CSS */&#10;.hero { background: #f9f6ef; }"></textarea></div>
              <div className="space-y-2"><Label>Footer text</Label><Input defaultValue="© 2026 Boutique Élégance - Propulsé par Barka" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Facebook</Label><Input placeholder="https://facebook.com/..." /></div>
                <div className="space-y-2"><Label>Instagram</Label><Input placeholder="https://instagram.com/..." /></div>
                <div className="space-y-2"><Label>TikTok</Label><Input placeholder="https://tiktok.com/..." /></div>
              </div>
              <Button className="w-full">Sauvegarder personnalisation</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
