import { Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { HomeSectionHeader } from './HomeSectionHeader'

const reviews = [
  ['ผ้านุ่มมาก สีสวยตรงปก สกรีนแล้วเลือกงานสวยมากค่ะ', 'คุณส้ม', 'เจ้าของแบรนด์เสื้อผ้า'],
  ['บริการดี จองง่าย ส่งไว ซื้อประจำเลยค่ะ', 'คุณทีม', 'โรงงานผลิตเสื้อ'],
  ['มีสีให้เลือกเยอะมาก ครบจบที่นี่เลย', 'คุณดา', 'เจ้าของร้านสกรีน'],
  ['ผ้าคุณภาพดี ราคาคุ้ม เหมาะกับงานให้คำแนะนำดีมากค่ะ', 'คุณนุ่น', 'Designer'],
]

export function ReviewsSection() {
  return (
    <section className="page-shell py-5 pb-8">
      <HomeSectionHeader title="CUSTOMER REVIEWS" action="View all reviews →" />
      <div className="grid gap-4 md:grid-cols-4">
        {reviews.map(([copy, name, role]) => (
          <Card key={name} className="rounded-lg p-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p className="mt-3 min-h-14 text-sm leading-6 text-[#061b3a]">{copy}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[#061b3a] text-xs font-bold text-white">{name.slice(-1)}</span>
                <span>
                  <strong className="block text-sm text-black">{name}</strong>
                  <span className="text-xs text-zinc-500">{role}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

