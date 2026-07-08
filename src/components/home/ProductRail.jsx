import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FabricCard } from '../product/FabricCard'
import { HomeSectionHeader } from './HomeSectionHeader'

export function ProductRail({ title, fabrics, onOpen, ranked = false }) {
  return (
    <section className="page-shell py-5">
      <HomeSectionHeader title={title} />
      <div className="relative">
        <button type="button" className="absolute -left-5 top-1/2 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow md:grid" aria-label="Previous">
          <ChevronLeft size={17} aria-hidden="true" />
        </button>
        <div className="grid gap-4 md:grid-cols-5">
          {fabrics.slice(0, 5).map((fabric, index) => (
            <FabricCard
              key={fabric.id}
              fabric={fabric}
              onOpen={onOpen}
              variant="rail"
              badge={ranked ? undefined : 'NEW'}
              rank={ranked ? index + 1 : undefined}
            />
          ))}
        </div>
        <button type="button" className="absolute -right-5 top-1/2 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow md:grid" aria-label="Next">
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
