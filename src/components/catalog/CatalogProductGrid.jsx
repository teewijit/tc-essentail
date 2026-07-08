import { FabricCard } from '../product/FabricCard'
import { Card, CardContent } from '../ui/card'
import { ActiveFilterBar } from './ActiveFilterBar'
import { CatalogPagination } from './CatalogPagination'

export function CatalogProductGrid({ catalog, filters, openDetail }) {
  return (
    <Card className="h-fit w-full rounded-xl p-0 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
      <CardContent className="flex flex-col gap-4 p-4">
        <ActiveFilterBar filters={filters} count={catalog.count} />
        <div className="product-grid">
          {catalog.items.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} onOpen={openDetail} />
          ))}
        </div>
        <CatalogPagination />
      </CardContent>
    </Card>
  )
}
