import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Store, Users, TrendingUp, ShieldCheck, AlertTriangle, Server, Database } from 'lucide-react'

export function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-ink-900 text-white flex items-center justify-center"><ShieldCheck className="h-5 w-5" /></div>
            Super Admin
          </h1>
          <p className="text-sm text-ink-600 mt-1">Gestion globale SaaS Barka - tenants, facturation, monitoring</p>
        </div>
        <Badge variant="destructive">SUPER_ADMIN uniquement</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Total boutiques</p><p className="text-[22px] font-bold mt-1">1,247</p><p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +24 cette semaine</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">MRR</p><p className="text-[22px] font-bold mt-1">18,420 TND</p><p className="text-xs text-ink-400 mt-1">Churn 2.1%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-ink-500">Utilisateurs actifs</p><p className="text-[22px] font-bold mt-1">892</p><p className="text-xs text-ink-400 mt-1">DAU</p></CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/50"><CardContent className="p-4"><p className="text-xs text-amber-700">Boutiques suspendues</p><p className="text-[22px] font-bold mt-1 text-amber-800">3</p><p className="text-xs text-amber-700 mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> À vérifier</p></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-[16px]">Boutiques récentes</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ink-50/50 text-xs text-ink-500 border-y">
                  <tr>
                    <th className="text-left p-3 font-medium">Boutique</th>
                    <th className="text-left p-3 font-medium">Owner</th>
                    <th className="text-left p-3 font-medium">Plan</th>
                    <th className="text-left p-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {[
                    { name: 'Boutique Élégance', owner: 'ahmed@exemple.tn', plan: 'Growth', status: 'active' },
                    { name: 'TechStore TN', owner: 'tech@exemple.tn', plan: 'Scale', status: 'active' },
                    { name: 'Beauty Bio', owner: 'beauty@exemple.tn', plan: 'Starter', status: 'active' },
                    { name: 'Maison & Déco', owner: 'maison@exemple.tn', plan: 'Growth', status: 'suspended' },
                  ].map(b => (
                    <tr key={b.name} className="hover:bg-ink-50/50">
                      <td className="p-3 font-medium flex items-center gap-2"><Store className="h-4 w-4 text-ink-400" /> {b.name}</td>
                      <td className="p-3 text-xs text-ink-600">{b.owner}</td>
                      <td className="p-3"><Badge variant="secondary">{b.plan}</Badge></td>
                      <td className="p-3">{b.status === 'active' ? <Badge variant="success">Active</Badge> : <Badge variant="destructive">Suspendue</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><Server className="h-4 w-4" /> Infrastructure</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-ink-600">Cloudflare Pages</span><span className="font-bold text-emerald-600">● Opérationnel</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Supabase DB</span><span className="font-bold text-emerald-600">● Opérationnel</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Supabase Auth</span><span className="font-bold text-emerald-600">● Opérationnel</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Storage</span><span className="font-bold text-emerald-600">● 42% utilisé</span></div>
              <div className="flex justify-between"><span className="text-ink-600">Edge Functions</span><span className="font-bold text-emerald-600">● 3 déployées</span></div>
            </CardContent>
          </Card>

          <Card className="bg-ink-950 text-white border-ink-800">
            <CardHeader><CardTitle className="text-[14px] flex items-center gap-2"><Database className="h-4 w-4" /> RLS & Tenant Isolation</CardTitle></CardHeader>
            <CardContent className="text-xs leading-relaxed text-ink-300 space-y-2">
              <p>• 25+ tables avec RLS activé</p>
              <p>• Fonction is_store_member() vérifie appartenance</p>
              <p>• Test isolation: merchant A ne peut jamais lire store B</p>
              <p>• Audit logs pour actions super_admin</p>
              <p>• Storage isolé par store_id/</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[16px]">Actions Super Admin</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Voir tous les tenants</Button>
          <Button variant="outline" size="sm">Gérer facturation</Button>
          <Button variant="outline" size="sm">Monitoring RLS</Button>
          <Button variant="outline" size="sm">Logs audit</Button>
          <Button variant="destructive" size="sm">Suspendre boutique</Button>
        </CardContent>
      </Card>
    </div>
  )
}
