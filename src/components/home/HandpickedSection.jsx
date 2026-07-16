import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { Button } from '../ui/Button'

const collectionCards = [
  {
    id: 'new-arrivals',
    title: { th: 'สินค้าเข้าใหม่', en: 'New Arrivals' },
    copy: { th: 'ผ้าใหม่พร้อมเลือกใช้', en: 'Fresh fabrics, just in' },
    filter: { sort: 'Latest' },
    tone: '#e9e1d4',
    accent: '#f8f5ee',
  },
  {
    id: 'best-sellers',
    title: { th: 'สินค้าขายดี', en: 'Best Sellers' },
    copy: { th: 'รุ่นที่ลูกค้าเลือกซ้ำ', en: 'Favorites of the month' },
    filter: { sort: 'Popular' },
    tone: '#061b3a',
    accent: '#23365f',
  },
  {
    id: 'solid-essentials',
    title: { th: 'สินค้าโปรโมชัน', en: 'Solid Essentials' },
    copy: { th: 'พื้นฐาน ใช้งานง่าย', en: 'Timeless and versatile' },
    filter: { type: 'Cotton' },
    tone: '#a88a63',
    accent: '#d5c2a3',
  },
  {
    id: 'corporate-picks',
    title: { th: 'สินค้า', en: 'Corporate Picks' },
    copy: { th: 'ผ้าสำหรับงานทีมและองค์กร', en: 'Quality for professionals' },
    filter: { usage: 'Uniform' },
    tone: '#74785b',
    accent: '#c9d0bc',
  },
]

const getText = (value, language) => value[language] || value.th || value.en

export function HandpickedSection({ openCatalog }) {
  const { language } = useLanguage()

  return (
    <section className="bg-[#f7f5f2] py-8" aria-labelledby="handpicked-heading">
      <div className="page-shell">
        <header className="mb-5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-zinc-500">
            {language === 'en' ? 'Explore Collections' : 'คอลเลกชันแนะนำ'}
          </p>
          <h2 id="handpicked-heading" className="mt-1 text-2xl font-extrabold text-black">
            {language === 'en' ? 'Handpicked for You' : 'คัดสรรเพื่อคุณ'}
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {collectionCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => openCatalog?.(card.filter)}
              className="group relative min-h-32 overflow-hidden rounded-lg p-5 text-left text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{ '--tone': card.tone, '--accent': card.accent }}
            >
              <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--tone),var(--accent))]" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.35),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.08))]" />
              <span className="relative z-10 flex min-h-22 flex-col justify-end">
                <span className="text-lg font-extrabold">{getText(card.title, language)}</span>
                <span className="mt-1 text-sm font-medium text-white/88">{getText(card.copy, language)}</span>
              </span>
              <Button
                type="button"
                size="icon-sm"
                variant="secondary"
                tabIndex={-1}
                className="absolute bottom-4 right-4 z-10 rounded-full bg-white text-[#061b3a] shadow-sm transition group-hover:bg-primary group-hover:text-black"
                aria-hidden="true"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
