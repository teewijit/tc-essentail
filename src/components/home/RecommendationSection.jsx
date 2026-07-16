import { Button } from '../ui/Button'
import { HomeSectionHeader } from './HomeSectionHeader'

const cards = [
  ['For T-Shirt Printing', 'เนื้อผ้านุ่ม ไม่หนัก สกรีนสวย สีติดทน', '#2f3337'],
  ['For Oversize Style', 'ผ้าทิ้งตัว ใส่สบาย เหมาะกับเสื้อทรงหลวม', '#7b736d'],
  ['For Sportswear', 'ระบายอากาศดี แห้งไว ไม่อับชื้น', '#172845'],
  ['For Streetwear', 'เนื้อผ้าหนา มีสไตล์ในทุกวัน', '#111111'],
]

export function RecommendationSection() {
  return (
    <section className="bg-white py-8">
      <div className="page-shell">
        <HomeSectionHeader title="RECOMMENDED FOR YOU" />
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map(([title, copy, color]) => (
            <div key={title} className="recommend-card rounded-lg p-5 text-white" style={{ '--tone': color }}>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-white/90">{copy}</p>
              <Button variant="outline" className="mt-4 h-10 bg-white text-sm text-black hover:bg-primary">
                SHOP NOW
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
