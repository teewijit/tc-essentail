import { Layers, PackageCheck, Scale, ShieldCheck, Shirt, Truck } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { Card, CardContent } from '../ui/card'

export function SuitableSection({ fabric }) {
  const { language } = useLanguage()
  const labels = language === 'en'
    ? {
        usage: 'Suitable for',
        composition: 'Composition',
        weightWidth: 'Weight / Width',
        minimumOrder: 'Minimum order',
        minimumOrderValue: '1 yard (36 inches)',
        shipping: 'Shipping',
        shippingValue: 'Nationwide 1-3 business days',
        quality: 'Quality',
        qualityValue: 'Every lot checked before shipping',
      }
    : {
        usage: 'เหมาะสำหรับ',
        composition: 'เนื้อผ้า',
        weightWidth: 'น้ำหนัก / หน้ากว้าง',
        minimumOrder: 'ขั้นต่ำต่อออเดอร์',
        minimumOrderValue: '1 หลา (36 นิ้ว)',
        shipping: 'การจัดส่ง',
        shippingValue: 'ทั่วประเทศ 1-3 วันทำการ',
        quality: 'คุณภาพ',
        qualityValue: 'ตรวจสอบทุกล็อตก่อนจัดส่ง',
      }
  const items = [
    [Shirt, labels.usage, fabric.usage],
    [Layers, labels.composition, fabric.composition],
    [Scale, labels.weightWidth, `${fabric.gsm} GSM • ${fabric.width}"`],
    [PackageCheck, labels.minimumOrder, labels.minimumOrderValue],
    [Truck, labels.shipping, labels.shippingValue],
    [ShieldCheck, labels.quality, labels.qualityValue],
  ]

  return (
    <Card className="rounded-xl p-0 shadow-sm">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map(([Icon, title, copy]) => (
          <div key={title} className="flex items-center gap-3 border-border lg:border-r lg:pr-3 lg:last:border-r-0">
            <Icon size={30} className="shrink-0 text-[#061b3a]" aria-hidden="true" />
            <span className="min-w-0">
              <strong className="block text-sm text-[#061b3a]">{title}</strong>
              <span className="block truncate text-xs text-zinc-500">{copy}</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
