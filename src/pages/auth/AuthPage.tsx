import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BarkaLogo } from '@/components/layout/BarkaLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { ArrowLeft, Package, ShieldCheck, Zap } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (!isSupabaseConfigured()) {
      // Demo mode - allow any login for MVP showcase
      setTimeout(() => {
        localStorage.setItem('barka_demo_user', JSON.stringify({ email, role: 'STORE_OWNER' }))
        navigate('/dashboard')
        setLoading(false)
      }, 800)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col p-6 lg:p-10 bg-white">
        <div className="flex items-center justify-between">
          <BarkaLogo size="sm" />
          <Link to="/" className="text-sm text-ink-600 hover:text-ink-900 flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-[380px]">
            <div className="mb-8">
              <h1 className="font-display text-[30px] font-bold tracking-tight text-ink-900">Bon retour</h1>
              <p className="mt-2 text-ink-600">Connectez-vous à votre boutique Barka</p>
            </div>

            <Card className="border-ink-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-[18px]">Connexion</CardTitle>
                <CardDescription>Entrez vos identifiants pour accéder au dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="vous@exemple.tn" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link to="/forgot" className="text-xs text-barka-600 hover:underline">Oublié ?</Link>
                    </div>
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  
                  {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
                  {!isSupabaseConfigured() && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                      Mode démo: Supabase non configuré. N'importe quel email/mot de passe fonctionne pour la présentation.
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </Button>

                  <div className="text-center text-sm text-ink-600">
                    Pas de compte ? <Link to="/register" className="font-medium text-barka-600 hover:underline">Créer un compte</Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-ink-400">En continuant, vous acceptez nos Conditions et Politique de confidentialité</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col bg-ink-950 text-white p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barka-900/50 to-ink-950" />
        <div className="absolute top-20 right-20 h-64 w-64 bg-barka-600 rounded-full blur-[100px] opacity-20" />
        
        <div className="relative flex-1 flex flex-col justify-center max-w-[440px] mx-auto">
          <div className="inline-flex h-12 w-12 rounded-xl bg-white/10 items-center justify-center mb-6">
            <Package className="h-6 w-6" />
          </div>
          <h2 className="font-display text-[36px] font-bold leading-[1.1]">Gérez votre commerce depuis n'importe où</h2>
          <p className="mt-4 text-ink-300 leading-relaxed">Tableau de bord mobile-first, analytics en temps réel, gestion COD complète. Barka est conçu pour les marchands tunisiens modernes.</p>
          
          <div className="mt-10 space-y-4">
            {[
              { icon: ShieldCheck, title: 'Sécurisé par RLS', desc: 'Isolation tenant au niveau base de données' },
              { icon: Zap, title: 'Ultra rapide', desc: 'Cloudflare Pages + Supabase Edge' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><item.icon className="h-5 w-5" /></div>
                <div><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-ink-400 mt-1">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-ink-500">© 2026 Barka • Commerce Tunisien</div>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    setError('')

    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        localStorage.setItem('barka_demo_user', JSON.stringify({ email: form.email, full_name: form.fullName, role: 'STORE_OWNER' }))
        navigate('/onboarding')
        setLoading(false)
      }, 800)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } }
      })
      if (error) throw error
      navigate('/onboarding')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9] p-6">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <div className="inline-flex"><BarkaLogo /></div>
          <h1 className="mt-6 font-display text-[28px] font-bold tracking-tight">Créez votre compte Barka</h1>
          <p className="mt-2 text-ink-600 text-sm">Commencez gratuitement, sans carte bancaire</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <Input placeholder="Ahmed Ben Salah" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="ahmed@exemple.tn" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <Input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Confirmer</Label>
                  <Input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required />
                </div>
              </div>
              {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Création...' : 'Créer mon compte'}</Button>
              <p className="text-center text-sm text-ink-600">Déjà un compte ? <Link to="/login" className="text-barka-600 font-medium hover:underline">Se connecter</Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
