import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { FabricSwatch } from '../product/FabricSwatch'
import { getSimilarFabrics } from './relatedFabrics'

export function SimilarProductsSection({ fabric, onOpen, onViewAll }) {
  const { language, t } = useLanguage()
  const similarFabrics = getSimilarFabrics(fabric)

  if (!similarFabrics.length) {
    return null
  }

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-[#061b3a]">{t('detail.relatedTitle')}</h2>
        {onViewAll && (
          <a href="#catalog" onClick={onViewAll} className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 hover:underline">
            {t('actions.viewAll')}
            <ChevronRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {similarFabrics.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <FabricSwatch fabric={item} className="h-36 w-full" />
            <div className="space-y-3 p-4">
              <div>
                {/* <p className="text-xl font-semibold text-zinc-500">{item.type}</p> */}
                {/* <h3 className="text-3xl font-extrabold text-[#061b3a] transition-colors group-hover:text-primary">{item.code}</h3> */}
                <p className="line-clamp-2 text-2xl font-semibold text-[#061b3a]">{item.name}</p>
              </div>

              <dl className="grid grid-cols-2 gap-2 text-md text-zinc-600">
                <div>
                  <dt className="font-semibold text-zinc-500">{t('detail.specs.usage')}</dt>
                  <dd className="font-bold text-[#061b3a]">{item.usage}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">{t('detail.specs.weight')}</dt>
                  <dd className="font-bold text-[#061b3a]">{item.gsm} GSM</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">{t('detail.specs.width')}</dt>
                  <dd className="font-bold text-[#061b3a]">{item.width}"</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">{t('detail.priceKg')}</dt>
                  <dd className="font-bold text-[#061b3a]">
                    {new Intl.NumberFormat(language, {
                      style: 'currency',
                      currency: 'THB',
                      maximumFractionDigits: 0,
                    }).format(item.price)}
                  </dd>
                </div>
              </dl>

              {/* <p className="line-clamp-3 text-md leading-6 text-zinc-600">{item.description}</p> */}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
