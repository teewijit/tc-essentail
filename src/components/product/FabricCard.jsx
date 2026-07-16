import { Heart } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { formatPrice } from '../../lib/format'
import { useFavoritesStore } from '../../store/useCollections'
import { useLanguage } from '../../i18n/useLanguage'
import { getFabricName } from '../../lib/fabricName'
import { formatFabricLength } from '../../lib/fabricLength'
import { FabricSwatch } from './FabricSwatch'

const productDots = ['#101010', '#69553e', '#a6a6a6', '#8e2149', '#294272']

const cardPresets = {
  catalog: {
    imageClass: 'h-48 w-full',
    contentClass: 'space-y-3 p-4',
    titleClass: 'text-base font-bold text-black',
    specClass: 'text-sm font-medium text-zinc-700',
    priceClass: 'text-lg font-semibold text-black',
    favoriteClass: 'right-3 top-3',
    heartSize: 17,
    showName: true,
    showColorBadge: true,
    showColorDots: false,
    showLength: true,
    popularBadge: true,
  },
  rail: {
    imageClass: 'h-44',
    contentClass: 'p-3',
    titleClass: 'text-sm font-extrabold text-black',
    specClass: 'mt-1 text-xs font-medium text-zinc-600',
    priceClass: 'text-lg font-semibold text-black',
    favoriteClass: 'right-2 top-2',
    heartSize: 17,
    showName: false,
    showColorBadge: false,
    showColorDots: true,
    showLength: true,
    popularBadge: false,
  },
  related: {
    imageClass: 'h-32 w-full',
    contentClass: 'p-3',
    titleClass: 'text-sm font-extrabold text-black',
    specClass: 'mt-1 text-xs font-medium text-zinc-600',
    priceClass: 'text-lg font-semibold text-black',
    favoriteClass: 'right-2 top-2',
    heartSize: 17,
    showName: true,
    showColorBadge: false,
    showColorDots: true,
    showLength: true,
    popularBadge: false,
  },
}

export function FabricCard({ fabric, onOpen, variant = 'catalog', badge, rank, options = {} }) {
  const config = { ...cardPresets[variant], ...options }

  return (
    <Card className="product-card group gap-0 overflow-hidden p-0">
      <button type="button" onClick={() => onOpen(fabric)} className="block w-full text-left">
        <div className="relative">
          <FabricSwatch fabric={fabric} className={config.imageClass} />
          <FavoriteButton fabric={fabric} config={config} />
          <ProductBadge fabric={fabric} badge={badge} rank={rank} config={config} />
        </div>
        <CardContent className={config.contentClass}>
          <ProductInfo fabric={fabric} config={config} />
          <ProductMeta fabric={fabric} config={config} />
        </CardContent>
      </button>
    </Card>
  )
}

function ProductBadge({ fabric, badge, rank, config }) {
  const { t } = useLanguage()

  if (rank) {
    return <Badge className="absolute left-2 top-2 bg-primary text-xs text-primary-foreground">{rank}</Badge>
  }

  if (badge) {
    return <Badge className="absolute left-2 top-2 bg-[#061b3a] text-xs text-white">{badge}</Badge>
  }

  if (config.popularBadge && fabric.isPopular) {
    return (
      <Badge className="absolute bottom-3 left-3 h-5 gap-1 bg-primary px-2 text-xs text-primary-foreground">
        {t('catalog.bestSeller')}
      </Badge>
    )
  }

  return null
}

function FavoriteButton({ fabric, config }) {
  const { t } = useLanguage()
  const isFavorite = useFavoritesStore((state) => state.items.some((item) => item.id === fabric.id))
  const toggle = useFavoritesStore((state) => state.toggle)

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={isFavorite ? t('actions.removeFavorite') : t('actions.addFavorite')}
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        toggle(fabric)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.stopPropagation()
          event.preventDefault()
          toggle(fabric)
        }
      }}
      className={`${config.favoriteClass} absolute z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-white/85 text-[#061b3a] shadow-sm transition hover:bg-white hover:text-red-500`}
    >
      <Heart
        size={config.heartSize}
        className={`transition-all duration-200 hover:scale-110 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
      />
    </span>
  )
}

function ProductInfo({ fabric, config }) {
  const { language } = useLanguage()
  const specText = config.showName ? `${fabric.gsm} GSM` : `${fabric.width}"`
  const trailingSpecText = config.showName ? `${fabric.width}"` : `${fabric.gsm} GSM`
  const specParts = [specText, trailingSpecText]

  if (config.showLength && fabric.lengthPerKg) {
    specParts.push(formatFabricLength(fabric, language))
  }

  return (
    <div>
      <h3 className={config.titleClass}>{getFabricName(fabric, language)}</h3>
      <span className="sr-only">{fabric.code}</span>
      <p className={config.specClass}>{specParts.join(' • ')}</p>
    </div>
  )
}

function ProductMeta({ fabric, config }) {
  return (
    <div className={config.showName ? 'flex items-center justify-between gap-3' : 'mt-3 flex items-center justify-between gap-2'}>
      {config.showColorBadge && (
        <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs text-zinc-700">
          {fabric.color}
        </Badge>
      )}
      {config.showColorDots && <ColorDots />}
      <strong className={config.priceClass}>{formatPrice(fabric.price)} / KG</strong>
    </div>
  )
}

function ColorDots() {
  const { t } = useLanguage()

  return (
    <span className="flex items-center gap-1">
      {productDots.slice(0, 4).map((dot) => (
        <span key={dot} className="size-2 rounded-full" style={{ background: dot }} />
      ))}
      <span className="text-xs text-zinc-500">{t('catalog.colorMore')}</span>
    </span>
  )
}
