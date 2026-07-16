import { Check } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { FabricSwatch } from '../product/FabricSwatch'
import { getSameTypeFabrics } from './relatedFabrics'
import { getFabricName } from '../../lib/fabricName'

export function SameTypeSection({ fabric, onOpen }) {
  const { language, t } = useLanguage()
  const sameTypeFabrics = getSameTypeFabrics(fabric)

  if (!sameTypeFabrics.length) {
    return null
  }

  return (
    <section>
      <h2 className="text-xl font-extrabold text-[#061b3a]">{t('detail.sameTypeTitle')}</h2>
      <div className="max-h-[240px] overflow-y-auto p-4">
        <div className="grid grid-cols-8 gap-3">
          {sameTypeFabrics.map((item) => {
            const isCurrent = item.id === fabric.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (!isCurrent) onOpen(item)
                }}
                aria-current={isCurrent ? 'true' : undefined}
                aria-label={getFabricName(item, language)}
                className={`relative aspect-square overflow-hidden rounded-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isCurrent ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/40'
                }`}
              >
                <FabricSwatch fabric={item} className="h-full w-full" />
                {isCurrent && (
                  <span className="absolute left-1 top-1 grid size-5 place-items-center rounded-sm bg-white text-emerald-600 shadow-sm">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
