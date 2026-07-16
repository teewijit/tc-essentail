import { useEffect, useRef, useState } from 'react'
import { Heart, MapPin, Phone, ShoppingCart, Trash2, UserRound } from 'lucide-react'
import { formatPrice } from '../../lib/format'
import { getFabricName } from '../../lib/fabricName'
import { useAuthStore } from '../../store/useAuthStore'
import { selectCartCount, selectCartTotal, useCartStore } from '../../store/useCartStore'
import { useFavoritesStore } from '../../store/useCollections'
import { useLanguage } from '../../i18n/useLanguage'
import { Button } from '../ui/Button'
import { FabricSwatch } from '../product/FabricSwatch'

export function SiteHeader({ currentView, setView }) {
  const user = useAuthStore((state) => state.user)
  const { language, setLanguage, t } = useLanguage()
  const navItems = [
    ['home', t('nav.home')],
    ['catalog', t('nav.catalog'), true],
    ['color', t('nav.color')],
    ['usage', t('nav.usage')],
    ['inspiration', t('nav.inspiration')],
  ]

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="bg-[#061b3a] text-white text-sm">
        <div className="page-shell flex min-h-10 items-center justify-between">
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => setView('about')} className="hover:text-primary">{t('nav.about')}</button>
            <button type="button" onClick={() => setView('location')} className="inline-flex items-center gap-1 hover:text-primary">
              <MapPin size={12} aria-hidden="true" />
              {t('nav.location')}
            </button>
            <button type="button" onClick={() => setView('contact')} className="inline-flex items-center gap-1 hover:text-primary">
              <Phone size={12} aria-hidden="true" />
              {t('nav.contact')}
            </button>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <span>Line: @teeculture101</span>
            <span className="inline-flex items-center gap-1">
              <Phone size={12} aria-hidden="true" />
              02-123-4567
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 p-0.5 font-bold">
              {['th', 'en'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                  className={`rounded-full px-2 py-0.5 transition-colors ${
                    language === option ? 'bg-primary text-black' : 'text-white/70 hover:text-primary'
                  }`}
                >
                  {t(`language.${option}`)}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-black text-white pt-2">
        <div className="page-shell relative flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => setView('home')}
            className="relative z-10 text-left leading-none transition-colors"
          >
            <span className="block text-xl font-extrabold tracking-tight text-primary">TEE CULTURE &nbsp;<span className="font-bold tracking-tight text-white">101</span></span>
          </button>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-md font-semibold xl:gap-9 lg:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                className={`inline-flex h-16 shrink-0 items-center gap-1 border-b-2 px-1 tracking-wide whitespace-nowrap transition-colors ${
                  currentView === key || (currentView === 'detail' && key === 'catalog')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-white hover:border-primary hover:text-primary'
                }`}
              >
                {label}
                {/* {hasMenu && <ChevronDown size={14} aria-hidden="true" />} */}
              </button>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-4">
            {/* <button type="button" className="transition-colors hover:text-primary" aria-label={t('actions.search')}>
              <Search size={23} aria-hidden="true" />
            </button> */}
            <button
              type="button"
              onClick={() => setView(user ? 'profile' : 'login')}
              className="transition-colors hover:text-primary"
              aria-label={user ? t('actions.profile') : t('actions.login')}
            >
              {user?.picture ? (
                <img src={user.picture} alt="" className="size-8 rounded-full" referrerPolicy="no-referrer" />
              ) : user ? (
                <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-extrabold text-black">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <UserRound size={22} aria-hidden="true" />
              )}
            </button>
            <WishlistButton setView={setView} />
            <CartButton setView={setView} />
          </div>
        </div>
      </div>
    </header>
  )
}

/* ---------- shared popover helpers ---------- */

function useOutsideClose(open, close) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) close()
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open, close])
  return ref
}

function CountBadge({ count }) {
  if (count <= 0) return null
  return (
    <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-black">
      {count}
    </span>
  )
}

/* ---------- Wishlist popover ---------- */

const PREVIEW_LIMIT = 3

function WishlistButton({ setView }) {
  const { language, t } = useLanguage()
  const favorites = useFavoritesStore((state) => state.items)
  const [open, setOpen] = useState(false)
  const containerRef = useOutsideClose(open, () => setOpen(false))

  const viewAll = () => {
    setOpen(false)
    setView('profile')
  }

  return (
    <div ref={containerRef} className="relative text-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative block transition-colors hover:text-primary"
        aria-label={t('actions.wishlist')}
        aria-expanded={open}
      >
        <Heart size={26} aria-hidden="true" />
        <CountBadge count={favorites.length} />
      </button>

      {open && (
        <div className="absolute -right-2 top-full z-50 mt-4 w-72 rounded-xl border border-zinc-200 bg-white p-3 text-black shadow-2xl">
          <p className="px-1 font-extrabold text-[#061b3a]">{t('wishlist.title', { count: favorites.length })}</p>

          {favorites.length === 0 ? (
            <p className="px-1 py-6 text-center text-zinc-500">
              {t('wishlist.empty')}
              <br />
              {t('wishlist.emptyHint')}
            </p>
          ) : (
            <div className="mt-2 space-y-1">
              {favorites.slice(0, PREVIEW_LIMIT).map((fabric) => (
                <div key={fabric.id} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-zinc-50">
                  <FabricSwatch fabric={fabric} className="h-10 w-12 shrink-0 rounded-md" />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-[#061b3a]">{fabric.code}</p>
                    <p className="truncate text-zinc-500">{getFabricName(fabric, language)}</p>
                  </div>
                </div>
              ))}
              {favorites.length > PREVIEW_LIMIT && (
                <p className="px-1.5 pt-1 text-zinc-400">
                  {t('wishlist.more', { count: favorites.length - PREVIEW_LIMIT })}
                </p>
              )}
            </div>
          )}

          <Button onClick={viewAll} className="mt-3 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {t('actions.viewAll')}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ---------- Mini cart popover ---------- */

function CartButton({ setView }) {
  const { language, t } = useLanguage()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const count = useCartStore(selectCartCount)
  const total = useCartStore(selectCartTotal)
  const [open, setOpen] = useState(false)
  const containerRef = useOutsideClose(open, () => setOpen(false))

  const goCart = () => {
    setOpen(false)
    // ตะกร้าว่าง → พาไปหน้าแคตตาล็อกแทน
    setView(items.length === 0 ? 'catalog' : 'cart')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative block transition-colors hover:text-primary"
        aria-label={t('actions.cart')}
        aria-expanded={open}
      >
        <ShoppingCart size={26} aria-hidden="true" />
        <CountBadge count={count} />
      </button>

      {open && (
        <div className="absolute -right-2 top-full z-50 mt-4 w-80 rounded-xl border border-zinc-200 bg-white p-3 text-black shadow-2xl">
          <p className="px-1 font-extrabold text-[#061b3a]">{t('cart.title', { count: items.length })}</p>

          {items.length === 0 ? (
            <p className="px-1 py-6 text-center text-zinc-500">
              {t('cart.empty')}
              <br />
              {t('cart.emptyHint')}
            </p>
          ) : (
            <>
              <div className="mt-2 max-h-64 space-y-1 overflow-y-auto pr-1">
                {items.map(({ fabric, qty }) => (
                  <div key={fabric.id} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-zinc-50">
                    <FabricSwatch fabric={fabric} className="h-11 w-13 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-[#061b3a]">{fabric.code}</p>
                      <p className="truncate text-zinc-500">{getFabricName(fabric, language)}</p>
                      <p className="text-xs text-zinc-500">
                        {qty} {fabric.unit} x {formatPrice(fabric.price)}
                      </p>
                    </div>
                    <strong className="shrink-0 text-[#061b3a]">{formatPrice(fabric.price * qty)}</strong>
                    <button
                      type="button"
                      onClick={() => removeItem(fabric.id)}
                      aria-label={t('actions.removeFromCart')}
                      className="shrink-0 p-1 text-base transition-colors hover:text-red-500"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-2 border-t border-zinc-100 px-1 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600">{t('cart.subtotal')}</span>
                  <strong className="text-[#061b3a]">{formatPrice(total)}</strong>
                </div>
                {/* <p className="mt-0.5 text-zinc-400">{t('cart.shippingActual')}</p> */}
              </div>
            </>
          )}

          <Button onClick={goCart} className="mt-3 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {items.length === 0 ? t('cart.chooseFabric') : t('cart.viewCart')}
          </Button>
        </div>
      )}
    </div>
  )
}
