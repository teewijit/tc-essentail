import { FabricCard } from './FabricCard'

export function ProductSection({ title, icon: Icon, fabrics, onOpen }) {
  return (
    <section className="section-shell">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-md bg-[#feb80e] text-black">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-extrabold text-black">{title}</h2>
      </div>
      <div className="product-grid">
        {fabrics.map((fabric) => (
          <FabricCard key={fabric.id} fabric={fabric} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

