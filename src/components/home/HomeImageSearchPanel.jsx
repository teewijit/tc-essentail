import { useLanguage } from '../../i18n/useLanguage'
import { SearchBar } from '../ui/SearchBar'
import { defaultCategoryTypes, getCategoryImage, getCategoryName } from './homeSearchPanelCategories'

export function HomeImageSearchPanel({ query, setQuery, openCatalog, categoryTypes = defaultCategoryTypes }) {
  const { language, t } = useLanguage()
  const [featuredCategory, ...groupedCategories] = categoryTypes

  const renderCategoryImage = (category, variant = 'grid') => {
    const image = getCategoryImage(category)
    const isFeatured = variant === 'featured'

    return (
      <button
        key={category.id}
        type="button"
        onClick={() => openCatalog(category.filter)}
        className="group relative block w-full overflow-hidden bg-zinc-200 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span className={`relative block ${isFeatured ? 'aspect-[16/9] min-h-[340px]' : 'aspect-[4/3] min-h-[230px]'}`}>
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/45 transition group-hover:bg-black/35" aria-hidden="true" />
          <span className="absolute inset-0 grid place-items-center px-5 text-center text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:text-4xl">
            {getCategoryName(category, language)}
          </span>
        </span>
      </button>
    )
  }

  return (
    <section className="page-shell py-8">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-4 px-6 py-5 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <h2 className="text-3xl font-bold text-black">{t('home.searchTitle')}</h2>
          <SearchBar query={query} setQuery={setQuery} onSubmit={openCatalog} className="w-full" />
        </div>

        {featuredCategory ? renderCategoryImage(featuredCategory, 'featured') : null}

        <div className="bg-zinc-100 py-3 text-center text-base font-medium text-zinc-900">Group by Application</div>

        <div className="grid grid-cols-1 gap-2 bg-white p-2 sm:grid-cols-2 lg:grid-cols-3">
          {groupedCategories.map((category) => (
            <div key={category.id}>{renderCategoryImage(category)}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
