import { useLanguage } from '../../i18n/useLanguage'
import { Button } from '../ui/Button'
import { HomeSectionHeader } from './HomeSectionHeader'

const cards = [
  {
    id: 't-shirt-printing',
    key: 'tShirtPrinting',
    tone: '#2f3337',
  },
  {
    id: 'oversize',
    key: 'oversize',
    tone: '#7b736d',
  },
  {
    id: 'sportswear',
    key: 'sportswear',
    tone: '#172845',
  },
  {
    id: 'streetwear',
    key: 'streetwear',
    tone: '#111111',
  },
]

export function RecommendationSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-8">
      <div className="page-shell">
        <HomeSectionHeader
          title={t('home.recommendation.title')}
          action={`${t('actions.viewAll')} ->`}
        />
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <div key={card.id} className="recommend-card rounded-lg p-5 text-white" style={{ '--tone': card.tone }}>
              <h3 className="text-lg font-extrabold">{t(`home.recommendation.cards.${card.key}.title`)}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-white/90">
                {t(`home.recommendation.cards.${card.key}.copy`)}
              </p>
              <Button variant="outline" className="mt-4 h-10 bg-white text-sm text-black hover:bg-primary">
                {t('actions.shopNow')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
