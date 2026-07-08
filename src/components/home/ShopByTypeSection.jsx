import { CircleDot, Gem, Grid3X3, Shirt, Sparkles } from 'lucide-react'
import { HomeSectionHeader } from './HomeSectionHeader'

const types = [
  ['Cotton', '#f8f5ee', Sparkles],
  ['TC (Poly-Cotton)', '#2f3337', CircleDot],
  ['Polyester', '#061b3a', Gem],
  ['Cotton Spandex', '#e8dccb', Shirt],
  ['Rib', '#d89991', Grid3X3],
  ['French Terry', '#b7afa5', CircleDot],
  ['Mesh', '#099f92', Grid3X3],
  ['Fleece', '#f2ead9', Sparkles],
]

export function ShopByTypeSection({ openCatalog }) {
  return (
    <section className="page-shell py-5">
      <HomeSectionHeader title="SHOP BY FABRIC TYPE" action="View all types →" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
        {types.map(([name, color, Icon]) => (
          <button key={name} type="button" onClick={() => openCatalog({ type: name.split(' ')[0] })} className="fabric-type-card relative overflow-hidden rounded-lg p-4 text-white shadow-sm" style={{ '--swatch': color, '--swatch-soft': `${color}66` }}>
            <span className="relative z-10 grid min-h-20 place-items-end text-center">
              <Icon size={21} aria-hidden="true" />
              <span className="mt-2 block text-xs font-extrabold">{name}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

