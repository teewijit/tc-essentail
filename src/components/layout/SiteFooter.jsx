import { Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'

const columns = [
  {
    titleKey: 'footer.shop',
    links: ['allFabrics', 'shopByColor', 'shopByType', 'shopByUsage'],
  },
  {
    titleKey: 'footer.information',
    links: ['about', 'location', 'howToOrder', 'faq', 'terms', 'privacy'],
  },
  {
    titleKey: 'footer.service',
    links: ['contact', 'shipping', 'payment', 'returns'],
  },
]

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#061b3a] text-white">
      <div className="page-shell grid gap-6 py-7 md:grid-cols-[1.15fr_0.7fr_0.85fr_0.9fr_1.2fr]">
        <div>
          <p className="mb-1 text-lg font-extrabold leading-none text-primary">{t('footer.title')}</p>
          <p className="text-sm font-bold leading-none">{t('footer.subtitle')}</p>
          <p className="mt-2.5 max-w-48 text-[11px] leading-4 text-white/75">
            {t('footer.blurb')}
          </p>
          <div className="mt-2.5 flex gap-2 text-white/85">
            {['f', 'ig', 'yt'].map((label) => (
              <span key={label} className="grid size-4 place-items-center rounded-full border border-white/30 text-[9px] font-bold uppercase">
                {label}
              </span>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.titleKey}>
            <h2 className="text-base font-bold tracking-wide text-white">{t(column.titleKey)}</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {column.links.map((link) => (
                <li key={link}>
                  <button type="button" className="text-left text-white/72 transition hover:text-primary">
                    {t(`footer.links.${link}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-bold tracking-wide text-white">{t('footer.contact')}</h2>
          <ul className="mt-2 space-y-2 text-sm text-white/75">
            <li className="flex gap-1.5">
              <Phone size={10} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
              02-123-4567
            </li>
            <li className="flex gap-1.5">
              <Mail size={10} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
              info@teeculturefabric.com
            </li>
            <li className="flex gap-1.5">
              <MapPin size={10} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
              123 ถ.สุขุมวิท แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10110
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-2 text-center text-[11px] text-white/60">
        © 2026 Tee Culture Fabric. All Rights Reserved.
      </div>
    </footer>
  )
}
