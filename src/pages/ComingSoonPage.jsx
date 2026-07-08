import { Clock, Layers, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/card'
import { useLanguage } from '../i18n/useLanguage'

export function ComingSoonPage({ page = 'collection', goHome, goCatalog }) {
  const { t } = useLanguage()
  const title = t(`comingSoon.labels.${page}`)
  const displayTitle = title === `comingSoon.labels.${page}` ? t('comingSoon.fallback') : title

  return (
    <main className="bg-white">
      <section className="page-shell py-4">
        <div className="mb-3 text-xs text-zinc-500">
          {t('nav.home')} <span className="mx-2">›</span> <strong className="text-black">{displayTitle}</strong>
        </div>
      </section>

      <section className="page-shell pb-12">
        <Card className="relative overflow-hidden rounded-2xl border-border bg-white p-0 shadow-[0_12px_34px_rgba(0,0,0,0.08)]">
          <CardContent className="grid min-h-[420px] place-items-center p-8 text-center">
            <div className="mx-auto max-w-xl">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(254,184,14,0.35)]">
                <Clock size={28} aria-hidden="true" />
              </div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-black">
                <Sparkles size={13} aria-hidden="true" />
                {t('comingSoon.badge')}
              </p>
              <h1 className="text-4xl font-extrabold text-black">{displayTitle}</h1>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {t('comingSoon.copy')}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={goCatalog}>
                  <Layers size={17} aria-hidden="true" />
                  {t('actions.goToFabric')}
                </Button>
                <Button variant="outline" onClick={goHome}>{t('actions.backHome')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
