import { ChevronDown, ChevronUp, Plus, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Slider } from '../ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useLanguage } from '../../i18n/useLanguage'

const filterGroups = [
  {
    title: { th: 'หมวดหมู่', en: 'CATEGORY' },
    filterKey: 'category',
    columns: true,
    items: [
      ['Dress'],
      ['Jacket/Hoody'],
      ['Pants'],
      ['Polo'],
      ['Streetwear'],
      ['T-Shirt'],
      ['Underwear'],
      ['Crop/Baby-Tee'],
      ['Shirt'],
      ['Accessory'],
    ],
  },
  {
    titleKey: 'filters.fabricType',
    filterKey: 'fabric_type',
    multi: true,
    columns: true,
    items: [
      ['Single Jersey', 120, 'single_jersey'],
      ['Interlock', 48, 'interlock'],
      ['Rib', 36, 'rib'],
      ['French Terry', 42, 'french_terry'],
      ['Pique', 24, 'pique'],
    ],
  },
  { titleKey: 'filters.composition', columns: true, items: [['100% Cotton', 86], ['Cotton Polyester', 92], ['100% Polyester', 28], ['Cotton Spandex', 34], ['Polyester Spandex', 18]] },
  { titleKey: 'filters.width', items: [['60" (152 cm)', 88], ['72" (183 cm)', 94], ['80" (203 cm)', 26]] },
  { titleKey: 'filters.stockStatus', columns: true, items: [['In Stock', 186], ['Low Stock', 32], ['Pre-Order', 18]] },
]

const colorSwatches = [
  ['White', '#ffffff'],
  ['Beige / Brown', '#cdbd9f'],
  ['Yellow / Orange', '#ffc400'],
  ['Orange', '#ff8a00'],
  ['Pink', '#f06f97'],
  ['Red', '#cc1638'],
  ['Purple', '#a65bb4'],
  ['Blue', '#0f4c9a'],
  ['Teal', '#0891a6'],
  ['Green', '#5fb336'],
  ['Grey', '#a7a7a7'],
  ['Black', '#000000'],
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
          <CheckGroup group={filterGroups[0]} filters={filters} setFilters={setFilters} />
          <CheckGroup group={filterGroups[1]} filters={filters} setFilters={setFilters} />
          <CheckGroup group={filterGroups[2]} filters={filters} setFilters={setFilters} />
          <RangeGroup title={t('filters.gsm')} min={100} max={300} unit="GSM" />
          <CheckGroup group={filterGroups[3]} filters={filters} setFilters={setFilters} />
          <ColorGroup />
          <CheckGroup group={filterGroups[4]} filters={filters} setFilters={setFilters} />
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
  const { language, t } = useLanguage()
  const title = group.title?.[language] || group.title?.th || t(group.titleKey)

  return (
    <FilterSection title={title}>
      <div className={`mt-3 grid gap-x-3 gap-y-2 ${group.columns ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {group.items.map(([label, count, value]) => (
          <CheckboxRow
            key={label}
            label={label}
            value={value || label}
            count={count}
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
  const id = `filter-${label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
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
        {colorSwatches.map(([name, color]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="size-5 rounded-full border border-[#cfcfcf] transition hover:scale-110 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                style={{ background: color }}
                aria-label={name}
              />
            </TooltipTrigger>
            <TooltipContent side="top">{name}</TooltipContent>
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
