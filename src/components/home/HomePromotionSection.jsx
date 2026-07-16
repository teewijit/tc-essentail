import { getActivePromotion, resolvePromotionItems } from '../../lib/promotions'
import { useLanguage } from '../../i18n/useLanguage'
import { PromotionFabricCard } from '../product/PromotionFabricCard'

export function HomePromotionSection({ promotions = [], catalogItems = [], fallbackFabrics = [], onOpen }) {
  const { t } = useLanguage()
  const promotion = getActivePromotion(promotions)

  if (!promotion) return null

  const items = resolvePromotionItems(promotion, catalogItems, fallbackFabrics)
  if (!items.length) return null

  const title = t('home.promoTitle')

  return (
    <section className="bg-white py-8" aria-labelledby="home-promotion-heading">
      <div className="page-shell">
      <div className="rounded-xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-6 shadow-sm md:px-8 md:py-8">
        <header className="mb-6 text-center md:mb-8">
          <h2 id="home-promotion-heading" className="text-2xl font-extrabold text-black">
            {title}
          </h2>
        </header>
        <div className="product-grid">
          {items.map((item) => (
            <PromotionFabricCard key={item.fabricId} item={item} onOpen={onOpen} />
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
