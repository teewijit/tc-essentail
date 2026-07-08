import { Card, CardContent } from '../ui/card'
import { formatPrice } from '../../lib/format'
import { useLanguage } from '../../i18n/useLanguage'
import { FabricSwatch } from './FabricSwatch'

export function PromotionFabricCard({ item, onOpen }) {
  const { fabric, promoPrice, compareAtPrice, discountPercent } = item
  const { t } = useLanguage()

  return (
    <Card className="product-card group gap-0 overflow-hidden p-0">
      <button type="button" onClick={() => onOpen(fabric)} className="block w-full text-left">
        <div className="relative">
          <FabricSwatch fabric={fabric} className="h-48 w-full" />
          <div
            className="absolute left-0 top-0 z-10 flex min-w-[72px] flex-col items-center bg-[#d62828] px-2 py-2 text-center text-white shadow-md"
            aria-label={`${t('home.promoPrice')}: ${formatPrice(promoPrice)}`}
          >
            <span className="text-lg font-semibold leading-none">{t('home.promoPriceLabel')}</span>
            <span className="mt-1 text-3xl font-bold leading-none tracking-tight">
              {promoPrice.toFixed(0)}
            </span>
            <span className="mt-0.5 text-lg font-medium leading-none">{t('home.promoUnit')}</span>
          </div>
        </div>
        <CardContent className="space-y-2 p-4">
          <div>
            <h3 className="truncate text-2xl font-bold text-black">{fabric.name}</h3>
            <p className="text-lg font-semibold text-[#1a7a3a]">{fabric.code}</p>
          </div>
          <ul className="space-y-0.5 text-lg text-zinc-600">
            <li>
              <span className="text-zinc-500">{t('home.promoWidth')}</span>{' '}
              <span className="font-medium text-zinc-800">{fabric.width}&quot;</span>
            </li>
            <li>
              <span className="text-zinc-500">{t('home.promoWeight')}</span>{' '}
              <span className="font-medium text-zinc-800">{fabric.gsm} GSM</span>
            </li>
          </ul>
          <div className="flex items-end justify-between gap-2 pt-1">
            <span className="text-lg text-zinc-400 line-through">
              {formatPrice(compareAtPrice)} {t('home.promoUnit')}
            </span>
            <div className="text-right">
              <strong className="text-3xl font-bold text-[#d62828]">
                {formatPrice(promoPrice)} {t('home.promoUnit')}
              </strong>
              {discountPercent > 0 && (
                <span className="mt-0.5 block text-lg font-semibold text-[#d62828]">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </button>
    </Card>
  )
}
