import { HomeSectionHeader } from './HomeSectionHeader'

const colorItems = [
  ['White', '120+ Shades', '#f8f5ee'],
  ['Beige / Brown', '80+ Shades', '#bd8759'],
  ['Yellow / Orange', '70+ Shades', '#ffb400'],
  ['Pink / Red', '90+ Shades', '#f15f72'],
  ['Purple', '50+ Shades', '#8a35a0'],
  ['Blue', '120+ Shades', '#2362b7'],
  ['Green', '80+ Shades', '#65a832'],
  ['Grey', '60+ Shades', '#bfc0c2'],
  ['Black', '100+ Shades', '#151515'],
]

export function ShopByColorSection({ openCatalog }) {
  return (
    <section className="page-shell py-5">
      <HomeSectionHeader title="SHOP BY COLOR" action="View all colors →" />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-9">
        {colorItems.map(([name, shade, color]) => (
          <button key={name} type="button" onClick={() => openCatalog({ color: name.split(' ')[0] })} className="text-center">
            <span className="fabric-tile mb-2 block aspect-square rounded-xl" style={{ '--swatch': color, '--swatch-soft': `${color}33` }} />
            <span className="block text-xs font-extrabold text-black">{name}</span>
            <span className="block text-xs font-semibold text-zinc-500">{shade}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
