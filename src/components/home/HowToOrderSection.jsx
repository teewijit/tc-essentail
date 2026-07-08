import { CalendarCheck, CreditCard, PackageCheck, Search, Truck } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'

const steps = [
  [Search, 'home.steps.choose'],
  [CalendarCheck, 'home.steps.reserve'],
  [CreditCard, 'home.steps.pay'],
  [PackageCheck, 'home.steps.prepare'],
  [Truck, 'home.steps.receive'],
]

export function HowToOrderSection() {
  const { t } = useLanguage()

  return (
    <section className="page-shell py-5">
      <h2 className="mb-5 text-2xl font-extrabold text-black">{t('home.howToOrder')}</h2>
      <div className="rounded-xl bg-[#f7f5f2] p-6">
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map(([Icon, key], index) => {
            const [title, copy] = t(key)
            return (
            <div key={key} className="relative text-center">
              {index > 0 && <span className="absolute -left-1/2 top-7 hidden w-full border-t border-dashed border-zinc-400 md:block" />}
              <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full bg-white text-[#061b3a] shadow-sm">
                <Icon size={25} aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-extrabold text-black">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-zinc-600">{copy}</p>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}

