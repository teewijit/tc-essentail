import { CatalogToolbar } from '../product/CatalogToolbar'
import { useLanguage } from '../../i18n/useLanguage'

export function CatalogHeader({ query, setQuery, sort, setSort, loading }) {
  const { t } = useLanguage()

  return (
    <section className="page-shell py-4">
      {/* <div className="mb-3 text-xs text-zinc-500">
        Home <span className="mx-2">›</span> Fabric <span className="mx-2">›</span> <strong className="text-black">All Fabrics</strong>
      </div> */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#061b3a]">{t('catalog.title')}</h1>
          {/* <p className="mt-1 text-sm text-black">{t('catalog.subtitle')}</p> */}
          {loading && <span className="mt-2 block text-xs text-zinc-500">{t('catalog.refreshing')}</span>}
        </div>
        <CatalogToolbar query={query} setQuery={setQuery} sort={sort} setSort={setSort} />
      </div>
    </section>
  )
}
