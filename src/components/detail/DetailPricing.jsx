import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { formatPrice } from '../../lib/format'
import { useLanguage } from '../../i18n/useLanguage'
import { getStockSummary } from './detailPricingDisplay'

const DEFAULT_LAST_UPDATED_AT = Date.now()

/** น้ำหนักผ้าต่อหลา (กก.) จาก GSM และหน้ากว้าง — ใช้ประมาณราคาขายต่อหลา */
const kgPerYard = (fabric) => (fabric.gsm * (fabric.width * 0.0254) * 0.9144) / 1000

/** ราคาและสถานะสต็อก — ขายตามน้ำหนัก (KG) และความยาว (หลา) */
export function DetailPricing({ fabric, now = DEFAULT_LAST_UPDATED_AT }) {
  const { language, t } = useLanguage()
  const yardPrice = fabric.price * kgPerYard(fabric)
  const stockSummary = getStockSummary(fabric, language)

  return (
    <Card className="rounded-xl p-0 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row md:items-stretch">
          <PricePanel
            title={t('detail.priceByWeight')}
            priceLabel={t('detail.priceKg')}
            price={`${formatPrice(fabric.price)} / KG`}
            stockSummary={stockSummary}
          />
          <Separator className="my-4 md:hidden" />
          <Separator orientation="vertical" className="mx-4 hidden md:block" />
          <PricePanel
            title={t('detail.priceByLength')}
            priceLabel={t('detail.priceYard')}
            price={`${formatPrice(yardPrice)} / YD`}
            stockSummary={stockSummary}
          />
        </div>
        <Separator />
        <p className="text-xs text-zinc-500">
          {t('detail.lastUpdated', {
            date: new Date(now).toLocaleString(language, { dateStyle: 'medium', timeStyle: 'short' }),
          })}
        </p>
      </CardContent>
    </Card>
  )
}

function PricePanel({ title, priceLabel, price, stockSummary }) {
  const { t } = useLanguage()

  return (
    <div className="flex-1">
      <h3 className="mb-3 text-center text-xs font-extrabold text-[#061b3a]">{title}</h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">{priceLabel}</span>
          <strong className="text-red-600">{price}</strong>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">{t('detail.stockStatus')}</span>
          <strong className="text-[#061b3a]">{stockSummary}</strong>
        </div>
      </div>
    </div>
  )
}
