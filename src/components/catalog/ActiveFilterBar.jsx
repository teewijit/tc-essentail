import { Badge } from '../ui/badge'
import { useLanguage } from '../../i18n/useLanguage'

export function ActiveFilterBar({ filters, count }) {
  const { t } = useLanguage()
  const activeFilters = Object.entries(filters).filter(([, value]) => value && value !== 'All')

  return (
    <div className="mb-4 flex flex-col gap-2 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-sm text-black">
        <span>{t('catalog.activeFilters')}</span>
        {activeFilters.length === 0 && (
          <Badge variant="secondary" className="rounded px-2 py-1 text-xs text-zinc-600">
            {t('catalog.noFilters')}
          </Badge>
        )}
        {activeFilters.map(([key, value]) => (
          <Badge key={key} variant="outline" className="rounded bg-muted px-2 py-1 text-xs font-semibold text-black">
            {value}
          </Badge>
        ))}
      </div>
      <p className="text-sm font-semibold text-zinc-600">{t('catalog.found', { count })}</p>
    </div>
  )
}
