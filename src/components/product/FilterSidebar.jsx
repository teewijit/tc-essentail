import { ChevronDown, ChevronUp, Plus, RotateCcw } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { filterOptionGroups } from '../../lib/filterLabels'
import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Slider } from '../ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const withCount = (items, counts) => items.map((item, index) => ({ ...item, count: counts[index] }))

const filterGroups = [
  {
    titleKey: 'filters.category',
    filterKey: 'category',
    columns: true,
    items: filterOptionGroups.category,
  },
  {
    titleKey: 'filters.fabricType',
    filterKey: 'fabric_type',
    multi: true,
    columns: true,
    items: withCount(filterOptionGroups.fabric_type, [120, 48, 36, 42, 24]),
  },
  {
    titleKey: 'filters.composition',
    columns: true,
    items: withCount(filterOptionGroups.composition, [86, 92, 28, 34, 18]),
  },
  {
    titleKey: 'filters.width',
    items: [
      { value: '60" (152 cm)', label: '60" (152 cm)', count: 88 },
      { value: '72" (183 cm)', label: '72" (183 cm)', count: 94 },
      { value: '80" (203 cm)', label: '80" (203 cm)', count: 26 },
    ],
  },
  {
    titleKey: 'filters.stockStatus',
    columns: true,
    items: withCount(filterOptionGroups.stockStatus, [186, 32, 18]),
  },
]

const colorSwatches = [
  [filterOptionGroups.color[0], '#ffffff'],
  [filterOptionGroups.color[1], '#cdbd9f'],
  [filterOptionGroups.color[2], '#ffc400'],
  [filterOptionGroups.color[3], '#ff8a00'],
  [filterOptionGroups.color[4], '#f06f97'],
  [filterOptionGroups.color[5], '#cc1638'],
  [filterOptionGroups.color[6], '#a65bb4'],
  [filterOptionGroups.color[7], '#0f4c9a'],
  [filterOptionGroups.color[8], '#0891a6'],
  [filterOptionGroups.color[9], '#5fb336'],
  [filterOptionGroups.color[10], '#a7a7a7'],
  [filterOptionGroups.color[11], '#000000'],
]

const emptyFilters = {
  type: 'All',
  fabric_type: 'All',
  category: 'All',
  color: 'All',
  gsm: 'All',
  width: 'All',
  usage: 'All',
}

export function FilterSidebar({ filters, setFilters }) {
  const { t } = useLanguage()
  const resetFilters = () => setFilters(emptyFilters)

  return (
    <Card className="h-fit gap-0 rounded-lg p-0 text-sm shadow-sm">
      <aside aria-label="Product filters">
        <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border px-4 py-3">
          <CardTitle className="text-lg font-extrabold text-black">{t('filters.title')}</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon-lg" onClick={resetFilters} className="text-[#00214d] hover:text-black">
                <RotateCcw className="size-5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{t('actions.clearAll')}</TooltipContent>
          </Tooltip>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {filterGroups.map((group) => (
            <CheckGroup key={group.titleKey || group.filterKey} group={group} filters={filters} setFilters={setFilters} />
          ))}
          <RangeGroup title={t('filters.gsm')} min={100} max={300} unit="GSM" />
          <ColorGroup />
          <RangeGroup title={t('filters.priceRange')} min={50} max={300} unit={t('filters.unitBaht')} />

          <Button variant="dark" className="mt-4 h-12 w-full bg-[#00214d] text-white hover:bg-black">
            {t('actions.applyFilter')}
          </Button>
        </CardContent>
      </aside>
    </Card>
  )
}

function SectionTitle({ title }) {
  return (
    <button type="button" className="flex w-full items-center justify-between gap-2 rounded-md py-1 text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
      <span className="text-sm font-extrabold text-black">{title}</span>
      <ChevronUp className="size-4" aria-hidden="true" />
    </button>
  )
}

function CheckGroup({ group, filters, setFilters }) {
  const { t } = useLanguage()
  const title = t(group.titleKey)

  return (
    <FilterSection title={title}>
      <div className={`mt-3 grid gap-x-3 gap-y-2 ${group.columns ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {group.items.map((item) => (
          <CheckboxRow
            key={`${group.filterKey || title}-${item.value}`}
            label={item.labelKey ? t(item.labelKey) : item.label}
            value={item.value}
            count={item.count}
            filterKey={group.filterKey}
            multi={group.multi}
            filters={filters}
            setFilters={setFilters}
          />
        ))}
      </div>
      <Button type="button" variant="ghost" size="xs" className="mt-3 h-8 px-0 text-black hover:bg-transparent">
        {t('actions.seeMore')}
        <ChevronDown className="size-4" aria-hidden="true" />
      </Button>
    </FilterSection>
  )
}

function CheckboxRow({ label, value, count, filterKey, multi, filters, setFilters }) {
  const id = `filter-${value.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
  const selectedValues = String(filters?.[filterKey] || 'All')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item && item !== 'All')
  const checked = filterKey ? (multi ? selectedValues.includes(value) : filters?.[filterKey] === value) : undefined
  const updateFilter = (nextChecked) => {
    if (!filterKey) return
    setFilters((current) => ({
      ...current,
      [filterKey]: getNextFilterValue({
        currentValue: current[filterKey],
        nextChecked,
        value,
        multi,
      }),
    }))
  }

  return (
    <label htmlFor={id} className="group/row flex min-w-0 cursor-pointer items-center gap-2 rounded-md py-1 text-sm font-medium text-black hover:bg-muted/60">
      <Checkbox id={id} className="size-4" checked={checked} onCheckedChange={updateFilter} />
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="min-w-0 flex-1 truncate">{label}</span>
        </TooltipTrigger>
        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
      {count !== undefined && <span className="shrink-0 text-zinc-600">({count})</span>}
    </label>
  )
}

function getNextFilterValue({ currentValue, nextChecked, value, multi }) {
  if (!multi) return nextChecked ? value : 'All'

  const values = String(currentValue || 'All')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item && item !== 'All')

  const nextValues = nextChecked
    ? Array.from(new Set([...values, value]))
    : values.filter((item) => item !== value)

  return nextValues.length > 0 ? nextValues.join(',') : 'All'
}

function ColorGroup() {
  const { t } = useLanguage()

  return (
    <FilterSection title={t('filters.color')}>
      <div className="mt-3 flex flex-wrap gap-2">
        {colorSwatches.map(([option, color]) => (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="size-5 rounded-full border border-[#cfcfcf] transition hover:scale-110 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                style={{ background: color }}
                aria-label={t(option.labelKey)}
              />
            </TooltipTrigger>
            <TooltipContent side="top">{t(option.labelKey)}</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="outline" size="icon-xs" className="rounded-full text-zinc-500" aria-label={t('catalog.moreColors')}>
              <Plus size={12} aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{t('catalog.moreColors')}</TooltipContent>
        </Tooltip>
      </div>
    </FilterSection>
  )
}

function RangeGroup({ title, min, max, unit }) {
  const { t } = useLanguage()

  return (
    <FilterSection title={title}>
      <div className="mt-3">
        <Slider min={min} max={max} step={1} defaultValue={[min, max]} aria-label={title} />
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2 text-sm font-medium text-black">
          <Input value={min} readOnly className="h-9 rounded-md px-2 text-sm" aria-label={t('filters.minimum', { title })} />
          <span className="text-zinc-400">-</span>
          <Input value={max} readOnly className="h-9 rounded-md px-2 text-sm" aria-label={t('filters.maximum', { title })} />
          <span className="text-zinc-700">{unit}</span>
        </div>
      </div>
    </FilterSection>
  )
}

function FilterSection({ title, children }) {
  return (
    <section className="py-3">
      <Separator className="-mt-3 mb-3 first:hidden" />
      <SectionTitle title={title} />
      {children}
    </section>
  )
}
