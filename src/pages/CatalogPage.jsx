import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { CatalogHeader } from '../components/catalog/CatalogHeader'
import { CatalogProductGrid } from '../components/catalog/CatalogProductGrid'
import { FilterSidebar } from '../components/product/FilterSidebar'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../i18n/useLanguage'

export function CatalogPage({ query, setQuery, filters, setFilters, sort, setSort, catalog, loading, openDetail }) {
  const { t } = useLanguage()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <main className="bg-white">
      <CatalogHeader query={query} setQuery={setQuery} sort={sort} setSort={setSort} loading={loading} />
      <section className="page-shell grid items-start gap-5 pb-10 lg:grid-cols-[420px_1fr]">
        <div className="lg:hidden">
          <Button
            type="button"
            variant={showMobileFilters ? 'dark' : 'outline'}
            className="h-11 w-full justify-center rounded-lg"
            onClick={() => setShowMobileFilters((current) => !current)}
            aria-expanded={showMobileFilters}
            aria-controls="mobile-filter-panel"
          >
            <SlidersHorizontal className="size-5" aria-hidden="true" />
            {showMobileFilters ? t('actions.hideFilters') : t('actions.showFilters')}
          </Button>
          {showMobileFilters && (
            <div id="mobile-filter-panel" className="mt-3">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <CatalogProductGrid catalog={catalog} filters={filters} openDetail={openDetail} />
      </section>
    </main>
  )
}
