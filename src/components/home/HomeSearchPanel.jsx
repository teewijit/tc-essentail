import { Baby, Dumbbell, GraduationCap, Grid3X3, PackageSearch, Shirt, Sparkles, Trophy } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { SearchBar } from '../ui/SearchBar'
import { defaultCategoryTypes, getCategoryName } from './homeSearchPanelCategories'

const categoryIconMap = {
  baby: Baby,
  graduation: GraduationCap,
  grid: Grid3X3,
  package: PackageSearch,
  shirt: Shirt,
  sparkle: Sparkles,
  sport: Dumbbell,
  trophy: Trophy,
}

export function HomeSearchPanel({ query, setQuery, openCatalog, categoryTypes = defaultCategoryTypes }) {
  const { language, t } = useLanguage()

  return (
    <section className="page-shell py-8">
      <div className="rounded-xl bg-[#f5f3f0] px-6 py-5 shadow-sm">
        <h2 className="text-center text-3xl font-bold text-black">{t('home.searchTitle')}</h2>
        <SearchBar query={query} setQuery={setQuery} onSubmit={openCatalog} className="mx-auto mt-4 max-w-4xl" />
        <div className="mx-auto mt-7">
          <h3 className="text-center text-2xl font-bold text-zinc-800">{t('home.categoryTitle')}</h3>
          <div className="mt-5 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5 text-lg text-black">
            {categoryTypes.map((category) => {
              const Icon = categoryIconMap[category.icon] ?? PackageSearch

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => openCatalog(category.filter)}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="grid size-32 place-items-center rounded-full bg-primary text-white shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <Icon size={68} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                  </span>
                  <span className="mt-3 leading-tight text-black">{getCategoryName(category, language)}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

