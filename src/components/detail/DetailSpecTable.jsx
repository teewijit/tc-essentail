import { Card, CardContent } from '../ui/card'
import { useLanguage } from '../../i18n/useLanguage'

/** ตารางสเปคผ้า */
export function DetailSpecTable({ fabric }) {
  const { t } = useLanguage()
  const rows = [
    [t('detail.specs.structure'), fabric.type],
    [t('detail.specs.composition'), fabric.composition],
    [t('detail.specs.weight'), `${fabric.gsm} GSM`],
    [t('detail.specs.width'), `${fabric.width}"`],
    [t('detail.specs.color'), fabric.color],
    [t('detail.specs.usage'), fabric.usage],
  ]

  return (
    <Card className="rounded-xl p-0 shadow-sm">
      <CardContent className="p-4">
        <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-sm text-[#061b3a]">
          {rows.map(([label, value]) => (
            <Row key={label} label={label} value={value} />
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

function Row({ label, value }) {
  return (
    <>
      <dt className="text-sm text-zinc-500">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </>
  )
}
