import { Bookmark, Heart, Share2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/Button'
import { Separator } from '../ui/separator'
import { useLanguage } from '../../i18n/useLanguage'
import { formatPrice } from '../../lib/format'
import { getFabricName } from '../../lib/fabricName'

/** ส่วนหัวสินค้า — ประเภท, ปุ่ม fav/bookmark/share, ชื่อ และคำอธิบาย */
export function DetailSummary({ fabric, saved, bookmarked, onFavorite, onBookmark, onShare }) {
  const { language, t } = useLanguage()

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <Badge className="bg-primary px-3 text-xs text-primary-foreground">{fabric.type.toUpperCase()}</Badge>
        <div className="flex gap-2 text-[#061b3a]">
          <Button
            type="button"
            variant="ghost"
            className="p-0 m-0"
            onClick={onFavorite}
            aria-label={saved ? t('actions.removeFavorite') : t('actions.addFavorite')}
            aria-pressed={saved}
          >
            <Heart
              className={`size-9 transition-all duration-200 hover:scale-110 ${
                saved ? 'fill-red-500 text-red-500' : 'hover:fill-red-500 hover:text-red-500'
              }`}
              aria-hidden="true"
            />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-0 m-0"
            onClick={onBookmark}
            aria-label={bookmarked ? t('actions.removeBookmark') : t('actions.bookmark')}
            aria-pressed={bookmarked}
          >
            <Bookmark
              className={`size-8 transition-all duration-200 hover:scale-110 ${
                bookmarked ? 'fill-primary text-primary' : 'hover:fill-primary hover:text-primary'
              }`}
              aria-hidden="true"
            />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-0 m-0"
            onClick={onShare}
            aria-label={t('actions.copyProductLink')}
          >
            <Share2 className="size-8 transition-all duration-200 hover:scale-110 hover:text-sky-600" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold leading-tight text-[#061b3a]">{fabric.code}</h1>
          <p className="text-xl font-semibold text-[#061b3a]">{getFabricName(fabric, language)}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-semibold text-zinc-500">{t('detail.priceKg')}</p>
          <strong className="block text-4xl font-extrabold leading-none text-red-600 sm:text-5xl">
            {formatPrice(fabric.price)}
          </strong>
        </div>
      </div>
      <Separator className="my-3 h-0.5 w-12 bg-primary" />
      <p className="max-w-xl text-base leading-7 text-[#061b3a]">{fabric.description}</p>
    </section>
  )
}
