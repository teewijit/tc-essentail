import { CatalogHeader } from '../components/catalog/CatalogHeader'
import { CatalogProductGrid } from '../components/catalog/CatalogProductGrid'
import { FilterSidebar } from '../components/product/FilterSidebar'

export function CatalogPage({ query, setQuery, filters, setFilters, sort, setSort, catalog, loading, openDetail }) {
  return (
    <main className="bg-white">
      <CatalogHeader query={query} setQuery={setQuery} sort={sort} setSort={setSort} loading={loading} />
      <section className="page-shell grid items-start gap-5 pb-10 lg:grid-cols-[420px_1fr]">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <CatalogProductGrid catalog={catalog} filters={filters} openDetail={openDetail} />
      </section>
    </main>
  )
}
