import { useState } from 'react'
import { Download, MessageSquare, Star } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/Button'
import { FabricSwatch } from '../product/FabricSwatch'
import { exportFabricSpecPdf } from '../../lib/fabricSpecPdf'

const copy = {
  th: {
    detail: 'รายละเอียด',
    review: 'รีวิว ({count})',
    specification: 'Specification',
    packageAndShipping: 'บรรจุภัณฑ์และระยะเวลาส่งของ',
    rollInfo: 'หน้าม้วน : ผ้าโรล (1 ผ้าโรล คิดราคาขายต่อกิโลกรัม คำนวณตามน้ำหนักจริงของม้วนนั้น)',
    shippingInfo: 'ระยะเวลาส่งของ : 3-5 วันทำการ (ขึ้นอยู่กับขนส่งแต่ละแห่ง)',
    noReviews: 'ยังไม่มีรีวิวสำหรับผ้ารุ่นนี้',
    noReviewsHint: 'รีวิวจากลูกค้าจะช่วยยืนยันคุณภาพล็อตและการใช้งานจริง',
    specs: {
      fabricCode: 'Fabric Code',
      material: 'Material',
      type: 'Type',
      style: 'Style',
      technics: 'Technics',
      feature: 'Feature',
      certification: 'Certification',
      fabricType: 'Fabric type',
      length: 'Length (ความยาว)',
      width: 'Width (หน้าผ้า)',
      weight: 'Weight (น้ำหนักผ้า)',
    },
  },
  en: {
    detail: 'Details',
    review: 'Reviews ({count})',
    specification: 'Specification',
    packageAndShipping: 'Packaging and shipping',
    rollInfo: 'Roll packing: sold by roll, priced by kilogram from actual roll weight.',
    shippingInfo: 'Shipping time: 3-5 business days, depending on the carrier.',
    noReviews: 'No reviews for this fabric yet',
    noReviewsHint: 'Customer reviews will help confirm lot quality and real-world use.',
    specs: {
      fabricCode: 'Fabric Code',
      material: 'Material',
      type: 'Type',
      style: 'Style',
      technics: 'Technics',
      feature: 'Feature',
      certification: 'Certification',
      fabricType: 'Fabric type',
      length: 'Length',
      width: 'Width',
      weight: 'Weight',
    },
  },
}

export function DetailSidePanels({ fabric, activeColor }) {
  const { language, t } = useLanguage()
  const labels = copy[language] || copy.th
  const [activePanel, setActivePanel] = useState('detail')
  const reviews = fabric.reviews || []
  const specRows = [
    [labels.specs.fabricCode, fabric.code],
    [labels.specs.material, fabric.composition],
    [labels.specs.type, 'Knitted Fabric'],
    [labels.specs.style, fabric.usage],
    [labels.specs.technics, 'Circular knit'],
    [labels.specs.feature, fabric.highlights.join(', ')],
    [labels.specs.certification, 'Oeko-Tex Standard 100'],
    [labels.specs.fabricType, fabric.type],
    [labels.specs.length, '2.50 หลา / kg'],
    [labels.specs.width, `${fabric.width}"`],
    [labels.specs.weight, `${fabric.gsm} GSM`],
  ]

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex text-base font-extrabold text-[#061b3a]" role="tablist" aria-label={labels.specification}>
          <TabButton
            active={activePanel === 'detail'}
            onClick={() => setActivePanel('detail')}
            controls="detail-panel"
          >
            {labels.detail}
          </TabButton>
          <TabButton
            active={activePanel === 'review'}
            onClick={() => setActivePanel('review')}
            controls="review-panel"
          >
            {labels.review.replace('{count}', reviews.length)}
          </TabButton>
        </div>
      </div>

      <Card className="-mt-px rounded-b-xl rounded-tr-xl border-0 p-0 shadow-sm ring-1 ring-black/10">
        <CardContent className="p-5">
          {activePanel === 'detail' ? (
            <div id="detail-panel" role="tabpanel" aria-label={labels.detail}>
              <section>
                <h3 className="text-lg font-extrabold text-[#061b3a]">{labels.specification}</h3>
                <div className="mt-4 grid gap-8 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr]">
                  <div className="text-sm text-[#061b3a]">
                    <FabricSwatch
                      fabric={{ ...fabric, colorValue: activeColor || fabric.colorValue }}
                      className="h-56 w-full rounded-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="mt-4 h-12 w-full"
                      onClick={() => exportFabricSpecPdf(fabric)}
                    >
                      <Download className="size-5" aria-hidden="true" />
                      {t('actions.downloadFabricCard')}
                    </Button>
                  </div>
                  <dl className="grid max-w-3xl grid-cols-[minmax(130px,0.42fr)_1fr] text-sm text-[#061b3a]">
                    {specRows.map(([label, value]) => (
                      <SpecRow key={label} label={label} value={value} />
                    ))}
                  </dl>
                </div>
              </section>

              {/* <section className="mt-7 max-w-3xl text-sm leading-7 text-[#061b3a]">
                <h3 className="font-extrabold">{labels.packageAndShipping}</h3>
                <p>
                  {labels.rollInfo}
                </p>
                <p>{labels.shippingInfo}</p>
              </section> */}

              <section className="mt-3 space-y-4 text-base leading-7 text-[#061b3a]">
                <p>
                  <strong>{fabric.name}</strong> {fabric.description} {fabric.highlights.join(' ')}
                </p>
              </section>
            </div>
          ) : (
            <ReviewPanel labels={labels} reviews={reviews} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function TabButton({ active, controls, onClick, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={`rounded-t-xl border px-5 py-2 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? 'relative z-10 border-black/10 border-b-white bg-white font-semibold text-[#061b3a] shadow-sm'
          : 'border-black/5 bg-white/60 text-zinc-500 hover:border-black/10 hover:bg-white hover:text-[#061b3a]'
      }`}
    >
      {children}
    </button>
  )
}

function SpecRow({ label, value }) {
  return (
    <>
      <dt className="border-b border-white bg-muted px-3 py-2 text-sm text-zinc-600">{label}</dt>
      <dd className="border-b border-white bg-white px-4 py-2 text-sm font-medium">{value}</dd>
    </>
  )
}

function ReviewPanel({ labels, reviews }) {
  return (
    <div id="review-panel" role="tabpanel" aria-label={labels.review.replace('{count}', reviews.length)}>
      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id || review.name} className="rounded-lg border border-border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm text-[#061b3a]">{review.name}</strong>
                <span className="flex items-center gap-1 text-primary">
                  {Array.from({ length: review.rating || 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-zinc-700">{review.comment}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid place-items-center px-4 py-16 text-center">
          <MessageSquare size={24} className="text-[#061b3a]" aria-hidden="true" />
          <p className="mt-3 text-lg font-extrabold text-[#061b3a]">{labels.noReviews}</p>
          <p className="mt-1 max-w-md text-sm text-zinc-600">{labels.noReviewsHint}</p>
        </div>
      )}
    </div>
  )
}
