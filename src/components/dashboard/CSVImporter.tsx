import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, Check, AlertTriangle, Download } from 'lucide-react'
import { CSV_TEMPLATES } from '@/lib/constants'

export function CSVImporter({ type = 'products' }: { type?: 'products' | 'categories' }) {
  const [step, setStep] = useState<'upload' | 'preview' | 'validate' | 'import'>('upload')
  const [file, setFile] = useState<File | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[16px] flex items-center gap-2"><Upload className="h-5 w-5" /> Import CSV - {type}</CardTitle>
        <CardDescription>Workflow: Upload → Preview → Validate → Dry run → Confirm → Import</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Steps */}
        <div className="flex items-center gap-2">
          {[
            { id: 'upload', label: 'Upload' },
            { id: 'preview', label: 'Preview' },
            { id: 'validate', label: 'Validate' },
            { id: 'import', label: 'Import' },
          ].map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${step === s.id ? 'bg-barka-600 text-white' : idx < ['upload','preview','validate','import'].indexOf(step) ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}>
                {idx < ['upload','preview','validate','import'].indexOf(step) ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className={`text-xs ${step === s.id ? 'font-bold text-ink-900' : 'text-ink-500'}`}>{s.label}</span>
              {idx < 3 && <div className="w-8 h-px bg-ink-200 mx-1" />}
            </div>
          ))}
        </div>

        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-ink-200 rounded-xl p-8 text-center hover:border-barka-300 transition-colors">
              <FileText className="h-10 w-10 text-ink-400 mx-auto" />
              <p className="font-medium mt-3">Glissez CSV ici ou cliquez</p>
              <p className="text-xs text-ink-500 mt-1">Max 5MB, UTF-8, colonnes requises selon template</p>
              <input type="file" accept=".csv" className="hidden" id="csv-upload" onChange={e => setFile(e.target.files?.[0] || null)} />
              <label htmlFor="csv-upload"><Button variant="outline" size="sm" className="mt-4">Choisir fichier</Button></label>
              {file && <p className="text-xs text-emerald-600 mt-2">Fichier: {file.name} ({(file.size/1024).toFixed(1)} KB)</p>}
            </div>

            <div className="rounded-xl bg-ink-50 border p-4">
              <p className="text-sm font-medium flex items-center gap-2"><Download className="h-4 w-4" /> Templates téléchargeables</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium">Produits CSV</p>
                  <pre className="mt-1 bg-white border rounded-lg p-2 text-[10px] overflow-x-auto">{CSV_TEMPLATES.products.slice(0, 200)}...</pre>
                  <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Télécharger template produits</Button>
                </div>
                <div>
                  <p className="text-xs font-medium">Catégories CSV</p>
                  <pre className="mt-1 bg-white border rounded-lg p-2 text-[10px] overflow-x-auto">{CSV_TEMPLATES.categories}</pre>
                  <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Télécharger template catégories</Button>
                </div>
              </div>
            </div>

            <Button className="w-full" disabled={!file} onClick={() => setStep('preview')}>Continuer → Preview</Button>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <div className="rounded-xl border overflow-hidden">
              <div className="bg-ink-50 p-3 border-b flex items-center justify-between">
                <p className="text-sm font-medium">Preview - 5 premières lignes</p>
                <Badge variant="secondary">24 lignes totales</Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-ink-50/50 border-b">
                    <tr><th className="p-2 text-left">name</th><th className="p-2 text-left">price</th><th className="p-2 text-left">stock</th><th className="p-2 text-left">status</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ['Robe lin beige', '89.000', '24', 'active'],
                      ['Support smartphone', '29.900', '50', 'active'],
                    ].map((row, i) => (
                      <tr key={i}><td className="p-2">{row[0]}</td><td className="p-2">{row[1]}</td><td className="p-2">{row[2]}</td><td className="p-2"><Badge variant="success" className="text-[10px]">{row[3]}</Badge></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('upload')}>Retour</Button>
              <Button className="flex-1" onClick={() => setStep('validate')}>Valider →</Button>
            </div>
          </div>
        )}

        {step === 'validate' && (
          <div className="space-y-4">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex gap-3">
              <Check className="h-5 w-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-emerald-900">Validation réussie</p>
                <p className="text-emerald-700/80 text-xs mt-1">22 lignes valides, 2 warnings (prix manquant → 0 par défaut)</p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900">2 warnings</p>
                <p className="text-amber-700/80 text-xs mt-1">Ligne 5: SKU dupliqué, sera auto-généré. Ligne 12: catégorie inexistante, sera créée.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('preview')}>Retour</Button>
              <Button className="flex-1" onClick={() => setStep('import')}>Dry run & Import</Button>
            </div>
          </div>
        )}

        {step === 'import' && (
          <div className="space-y-4 text-center py-6">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <div>
              <p className="font-bold">Import réussi !</p>
              <p className="text-sm text-ink-600 mt-1">22 produits importés, 2 catégories créées automatiquement</p>
            </div>
            <Button variant="outline" onClick={() => setStep('upload')}>Nouvel import</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
