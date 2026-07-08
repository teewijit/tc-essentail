import { SearchBar } from '../ui/SearchBar'
import { useLanguage } from '../../i18n/useLanguage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const sortOptions = ['Latest', 'Popular', 'Name']

export function CatalogToolbar({ query, setQuery, sort, setSort }) {
  const { t } = useLanguage()

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-2xl">
      <SearchBar
        query={query}
        setQuery={setQuery}
        className="w-full sm:flex-1"
      />
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <span className="shrink-0 text-sm text-muted-foreground">{t('catalog.sortBy')}</span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="!h-10 w-full py-0 text-sm sm:min-w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`catalog.sort.${option}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
