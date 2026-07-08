import { useMemo, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  CreditCard,
  LogIn,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  ShoppingCart,
  Trash2,
  Truck,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Separator } from '../components/ui/separator'
import { Textarea } from '../components/ui/textarea'
import { FabricSwatch } from '../components/product/FabricSwatch'
import { useLanguage } from '../i18n/useLanguage'
import { formatPrice } from '../lib/format'
import { selectDefaultAddress, useAddressStore } from '../store/useAddressStore'
import { useAuthStore } from '../store/useAuthStore'
import { selectCartTotal, useCartStore } from '../store/useCartStore'
import { useOrderStore } from '../store/useOrderStore'

const provinces = ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'เชียงใหม่']
const districts = ['เมือง', 'บางรัก', 'ลาดพร้าว', 'บางนา']
const subDistricts = ['คลองเตย', 'สีลม', 'จตุจักร', 'บางนาเหนือ']

const splitName = (name = '') => {
  const [firstName = '', ...rest] = name.trim().split(/\s+/).filter(Boolean)
  return { firstName, lastName: rest.join(' ') }
}

const getCheckoutLabels = (t) => ({
  breadcrumb: t('cart.checkout.breadcrumb'),
  deliveryTitle: t('cart.checkout.deliveryTitle'),
  deliveryCopy: t('cart.checkout.deliveryCopy'),
  userReady: t('cart.checkout.userReady'),
  guestTitle: t('cart.checkout.guestTitle'),
  guestCopy: t('cart.checkout.guestCopy'),
  loginHint: t('cart.checkout.loginHint'),
  loginAction: t('cart.checkout.loginAction'),
  continueGuest: t('cart.checkout.continueGuest'),
  receiver: t('cart.checkout.receiver'),
  deliveryMethod: t('cart.checkout.deliveryMethod'),
  paymentMethod: t('cart.checkout.paymentMethod'),
  reserve: t('cart.checkout.reserve'),
  firstName: t('cart.checkout.firstName'),
  lastName: t('cart.checkout.lastName'),
  email: t('cart.checkout.email'),
  phone: t('cart.checkout.phone'),
  address: t('cart.checkout.address'),
  province: t('cart.checkout.province'),
  district: t('cart.checkout.district'),
  subDistrict: t('cart.checkout.subDistrict'),
  postcode: t('cart.checkout.postcode'),
  note: t('cart.checkout.note'),
  noteHelp: t('cart.checkout.noteHelp'),
  selectPlaceholder: t('cart.checkout.selectPlaceholder'),
  summary: t('cart.checkout.summary'),
  cartTitle: t('cart.checkout.cartTitle'),
  inStock: t('cart.checkout.inStock'),
  qty: t('cart.checkout.qty'),
  code: t('cart.checkout.code'),
  color: t('cart.checkout.color'),
  width: t('cart.checkout.width'),
  gsm: t('cart.checkout.gsm'),
  type: t('cart.checkout.type'),
  clearCart: t('cart.checkout.clearCart'),
  subtotal: t('cart.checkout.subtotal'),
  vat: t('cart.checkout.vat'),
  shipping: t('cart.checkout.shipping'),
  shippingActual: t('cart.checkout.shippingActual'),
  grandTotal: t('cart.checkout.grandTotal'),
  summaryNoteTitle: t('cart.checkout.summaryNoteTitle'),
  summaryNote: t('cart.checkout.summaryNote'),
  confirm: t('cart.checkout.confirm'),
  guestConfirm: t('cart.checkout.guestConfirm'),
  missingInfo: t('cart.checkout.missingInfo'),
  successEmailFallback: t('cart.checkout.successEmailFallback'),
  shippingMethods: {
    delivery: t('cart.checkout.shippingMethods.delivery'),
    pickup: t('cart.checkout.shippingMethods.pickup'),
    express: t('cart.checkout.shippingMethods.express'),
  },
  paymentMethods: {
    transfer: t('cart.checkout.paymentMethods.transfer'),
    credit: t('cart.checkout.paymentMethods.credit'),
    promptpay: t('cart.checkout.paymentMethods.promptpay'),
    cod: t('cart.checkout.paymentMethods.cod'),
  },
})

export function CartPage({ goCatalog, goLogin, openDetailById }) {
  const { t } = useLanguage()
  const labels = useMemo(() => getCheckoutLabels(t), [t])
  const items = useCartStore((state) => state.items)
  const setQty = useCartStore((state) => state.setQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)
  const total = useCartStore(selectCartTotal)
  const user = useAuthStore((state) => state.user)
  const addOrder = useOrderStore((state) => state.addOrder)
  const defaultAddress = useAddressStore(selectDefaultAddress)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [formError, setFormError] = useState('')
  const nameParts = useMemo(() => splitName(defaultAddress?.name || user?.name), [defaultAddress?.name, user?.name])
  const [form, setForm] = useState(() => ({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: user?.email || '',
    phone: defaultAddress?.phone || '',
    address: defaultAddress?.address || '',
    province: defaultAddress?.province || '',
    district: '',
    subDistrict: '',
    postcode: defaultAddress?.postcode || '',
    note: '',
  }))

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0)
  const vat = total * 0.07
  const netTotal = total + vat

  const updateForm = (field, value) => {
    setFormError('')
    setForm((current) => ({ ...current, [field]: value }))
  }

  const checkout = () => {
    const required = ['firstName', 'phone', 'address', 'province', 'postcode']
    if (required.some((field) => !form[field]?.trim())) {
      setFormError(labels.missingInfo)
      return
    }

    addOrder({
      items,
      total: netTotal,
      address: {
        ...form,
        name: `${form.firstName} ${form.lastName}`.trim(),
        shippingMethod,
        paymentMethod,
        customerType: user ? 'member' : 'guest',
      },
    })
    clear()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    const contact = form.email || form.phone || user?.email || labels.successEmailFallback
    return (
      <main className="min-h-full bg-[#fbfcff]">
        <section className="page-shell flex justify-center py-16">
          <Card className="w-full max-w-md rounded-xl p-0 text-center shadow-sm">
            <CardContent className="p-8">
              <CheckCircle2 size={38} className="mx-auto text-emerald-500" aria-hidden="true" />
              <h1 className="mt-4 text-xl font-extrabold text-[#061b3a]">{t('cart.orderSent')}</h1>
              <p className="mt-2 text-base text-zinc-600">{t('cart.checkout.orderSentCopy', { contact })}</p>
              <Button className="mt-6 h-12 bg-primary text-base font-extrabold text-primary-foreground hover:bg-primary/90" onClick={goCatalog}>
                {t('actions.continueShopping')}
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-full bg-[#fbfcff]">
        <section className="page-shell flex justify-center py-16">
          <Card className="w-full max-w-md rounded-xl p-0 text-center shadow-sm">
            <CardContent className="p-8">
              <ShoppingCart size={36} className="mx-auto text-zinc-300" aria-hidden="true" />
              <h1 className="mt-4 text-xl font-extrabold text-[#061b3a]">{t('cart.empty')}</h1>
              <p className="mt-2 text-base text-zinc-600">{t('cart.emptyHint')}</p>
              <Button className="mt-6 h-12 bg-primary text-base font-extrabold text-primary-foreground hover:bg-primary/90" onClick={goCatalog}>
                {t('actions.goCatalog')}
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-full bg-[#fbfcff]">
      <section className="page-shell py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <button type="button" onClick={goCatalog} className="hover:text-primary">{labels.breadcrumb[0]}</button>
          <span>›</span>
          <span>{labels.breadcrumb[1]}</span>
          <span>›</span>
          <strong className="text-[#061b3a]">{labels.breadcrumb[2]}</strong>
        </div>

        {!user && <GuestCheckoutHint labels={labels} goLogin={goLogin} />}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(390px,2fr)]">
          <CheckoutDetails
            labels={labels}
            user={user}
            form={form}
            updateForm={updateForm}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            <CartItemsPanel
              labels={labels}
              items={items}
              cartCount={cartCount}
              setQty={setQty}
              removeItem={removeItem}
              clear={clear}
              goCatalog={goCatalog}
              openDetailById={openDetailById}
              t={t}
            />
            <OrderSummary
              labels={labels}
              total={total}
              vat={vat}
              netTotal={netTotal}
              user={user}
              formError={formError}
              checkout={checkout}
            />
          </aside>
        </div>
      </section>
    </main>
  )
}

function GuestCheckoutHint({ labels, goLogin }) {
  return (
    <Card className="mb-5 rounded-xl border-primary/40 bg-primary/10 p-0 shadow-none">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <LogIn size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[#061b3a]">{labels.guestTitle}</h2>
            <p className="text-sm text-zinc-700">{labels.guestCopy}</p>
            <p className="mt-1 text-sm font-semibold text-[#061b3a]">{labels.loginHint}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" className="h-11 bg-white text-sm font-extrabold" onClick={goLogin}>
            {labels.loginAction}
          </Button>
          <span className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-bold text-[#061b3a]">
            {labels.continueGuest}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function CheckoutDetails({ labels, user, form, updateForm, shippingMethod, setShippingMethod, paymentMethod, setPaymentMethod }) {
  const shippingOptions = [
    { id: 'delivery', icon: Truck },
    { id: 'pickup', icon: PackageCheck },
    { id: 'express', icon: Clock3 },
  ]
  const paymentOptions = ['transfer', 'credit', 'promptpay', 'cod']

  return (
    <Card className="rounded-xl p-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-extrabold text-[#061b3a]">{labels.deliveryTitle}</CardTitle>
            <p className="mt-1 text-base text-zinc-600">{labels.deliveryCopy}</p>
          </div>
          <div className="hidden rounded-lg bg-primary/15 px-3 py-2 text-right text-sm font-bold text-[#061b3a] sm:block">
            {user ? labels.userReady : labels.reserve}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-5">
        <section>
          <SectionHeading number="1" title={labels.receiver} />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label={labels.firstName} required>
              <Input className="h-11 text-base" placeholder={labels.firstName} value={form.firstName} onChange={(event) => updateForm('firstName', event.target.value)} />
            </Field>
            <Field label={labels.lastName}>
              <Input className="h-11 text-base" placeholder={labels.lastName} value={form.lastName} onChange={(event) => updateForm('lastName', event.target.value)} />
            </Field>
            <Field label={labels.email}>
              <Input className="h-11 text-base" type="email" placeholder="name@example.com" value={form.email} onChange={(event) => updateForm('email', event.target.value)} />
            </Field>
            <Field label={labels.phone} required>
              <Input className="h-11 text-base" placeholder="08x-xxx-xxxx" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} />
            </Field>
            <Field label={labels.address} required className="md:col-span-2">
              <Input className="h-11 text-base" placeholder={labels.address} value={form.address} onChange={(event) => updateForm('address', event.target.value)} />
            </Field>
            <Field label={labels.province} required>
              <Select value={form.province} onValueChange={(value) => updateForm('province', value)}>
                <SelectTrigger className="h-11 w-full text-base">
                  <SelectValue placeholder={labels.selectPlaceholder} />
                </SelectTrigger>
                <SelectContent>{provinces.map((province) => <SelectItem key={province} value={province}>{province}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={labels.district}>
              <Select value={form.district} onValueChange={(value) => updateForm('district', value)}>
                <SelectTrigger className="h-11 w-full text-base">
                  <SelectValue placeholder={labels.selectPlaceholder} />
                </SelectTrigger>
                <SelectContent>{districts.map((district) => <SelectItem key={district} value={district}>{district}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={labels.subDistrict}>
              <Select value={form.subDistrict} onValueChange={(value) => updateForm('subDistrict', value)}>
                <SelectTrigger className="h-11 w-full text-base">
                  <SelectValue placeholder={labels.selectPlaceholder} />
                </SelectTrigger>
                <SelectContent>{subDistricts.map((subDistrict) => <SelectItem key={subDistrict} value={subDistrict}>{subDistrict}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={labels.postcode} required>
              <Input className="h-11 text-base" placeholder="10110" value={form.postcode} onChange={(event) => updateForm('postcode', event.target.value)} />
            </Field>
            <Field label={labels.note} className="md:col-span-2">
              <Textarea className="min-h-24 text-base" maxLength={240} placeholder={labels.note} value={form.note} onChange={(event) => updateForm('note', event.target.value)} />
              <p className="mt-1 text-xs text-zinc-500">{labels.noteHelp}</p>
            </Field>
          </div>
        </section>

        <Separator />

        <section>
          <SectionHeading number="2" title={labels.deliveryMethod} />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {shippingOptions.map(({ id, icon }) => (
              <OptionCard key={id} active={shippingMethod === id} onClick={() => setShippingMethod(id)} icon={icon} label={labels.shippingMethods[id]} />
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <SectionHeading number="3" title={labels.paymentMethod} />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {paymentOptions.map((id) => (
              <OptionCard key={id} active={paymentMethod === id} onClick={() => setPaymentMethod(id)} icon={CreditCard} label={labels.paymentMethods[id]} />
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

function CartItemsPanel({ labels, items, cartCount, setQty, removeItem, clear, goCatalog, openDetailById, t }) {
  return (
    <Card className="rounded-xl border-[#d7dee9] bg-white p-0 shadow-md">
      <CardHeader className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-extrabold text-[#061b3a]">{labels.cartTitle} ({items.length})</CardTitle>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
            {t('cart.checkout.totalKg', { count: cartCount })}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {items.map(({ fabric, qty }) => (
            <article key={fabric.id} className="grid gap-3 p-4 sm:grid-cols-[104px_1fr_auto]">
              <button type="button" onClick={() => openDetailById(fabric.id)} className="shrink-0">
                <FabricSwatch fabric={fabric} className="h-26 w-26 rounded-lg" />
              </button>
              <div className="min-w-0">
                <button type="button" onClick={() => openDetailById(fabric.id)} className="text-left">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">{labels.inStock}</span>
                  <h3 className="mt-1 text-base font-extrabold leading-snug text-[#061b3a]">{fabric.name}</h3>
                </button>
                <p className="mt-1 text-sm text-zinc-600">
                  {labels.code}: {fabric.code} • {labels.color}: {fabric.color}
                </p>
                <p className="text-sm text-zinc-600">
                  {labels.width}: {fabric.width}" • {labels.gsm}: {fabric.gsm} • {labels.type}: {fabric.type}
                </p>
                <strong className="mt-2 block text-base text-red-600">{formatPrice(fabric.price)} / KG</strong>
              </div>
              <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                <div>
                  <span className="mb-1 block text-sm font-medium text-zinc-600">{labels.qty}</span>
                  <div className="inline-flex h-10 items-center rounded-lg border border-border bg-white">
                    <Button variant="ghost" size="icon-xs" aria-label={t('actions.decreaseQty')} onClick={() => setQty(fabric.id, qty - 1)}>
                      <Minus size={14} aria-hidden="true" />
                    </Button>
                    <span className="min-w-11 text-center text-base font-extrabold text-[#061b3a]">{qty}</span>
                    <Button variant="ghost" size="icon-xs" aria-label={t('actions.increaseQty')} onClick={() => setQty(fabric.id, qty + 1)}>
                      <Plus size={14} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <strong className="mt-3 block text-lg text-[#061b3a]">{formatPrice(fabric.price * qty)}</strong>
                <Button variant="ghost" size="icon-xs" aria-label={t('actions.removeFromCart')} onClick={() => removeItem(fabric.id)} className="mt-2 text-zinc-400 hover:text-red-500">
                  <Trash2 size={16} aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <Button variant="ghost" size="sm" onClick={goCatalog}>‹ {t('actions.continueShopping')}</Button>
          <Button variant="outline" size="sm" onClick={clear} className="border-red-200 text-red-600 hover:bg-red-50">
            <Trash2 size={14} aria-hidden="true" />
            {labels.clearCart}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderSummary({ labels, total, vat, netTotal, user, formError, checkout }) {
  return (
    <Card className="overflow-hidden rounded-xl border-[#071b38] bg-[#071b38] p-0 text-white shadow-xl">
      <CardContent className="p-5">
        <h2 className="text-xl font-extrabold">{labels.summary}</h2>
        <Separator className="my-4 bg-white/15" />
        <div className="space-y-3 text-base text-white/85">
          <SummaryRow label={labels.subtotal} value={formatPrice(total)} />
          <SummaryRow label={labels.vat} value={formatPrice(vat)} />
          <SummaryRow label={labels.shipping} value={labels.shippingActual} muted />
        </div>
        <Separator className="my-4 bg-white/15" />
        <div className="rounded-xl bg-white p-4 text-[#061b3a]">
          <div className="flex justify-between gap-4 text-lg font-extrabold">
            <span>{labels.grandTotal}</span>
            <span className="text-xl">{formatPrice(netTotal)}</span>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-primary/95 p-4 text-sm text-[#061b3a]">
          <div className="flex items-center gap-2 text-base font-extrabold">
            <MapPin size={18} aria-hidden="true" />
            {labels.summaryNoteTitle}
          </div>
          <p className="mt-1 font-medium">{labels.summaryNote}</p>
        </div>
        {formError && (
          <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}
        <Button className="mt-4 h-12 w-full bg-primary text-base font-extrabold text-primary-foreground hover:bg-primary/90" onClick={checkout}>
          {user ? labels.confirm : labels.guestConfirm}
        </Button>
      </CardContent>
    </Card>
  )
}

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid size-7 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{number}</span>
      <h2 className="text-lg font-extrabold text-[#061b3a]">{title}</h2>
    </div>
  )
}

function Field({ label, required, className = '', children }) {
  return (
    <label className={`block text-base font-semibold text-[#061b3a] ${className}`}>
      <span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  )
}

function OptionCard({ active, onClick, icon: Icon, label }) {
  const [title, detail] = label
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-24 items-start gap-3 rounded-xl border p-3 text-left text-base transition ${
        active ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-border bg-white hover:border-primary/60 hover:bg-primary/5'
      }`}
    >
      <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-[#061b3a]'}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <strong className="block text-[#061b3a]">{title}</strong>
        <small className="block text-sm text-zinc-600">{detail}</small>
      </span>
    </button>
  )
}

function SummaryRow({ label, value, muted }) {
  return (
    <div className={`flex justify-between gap-4 ${muted ? 'text-white/65' : ''}`}>
      <span>{label}</span>
      <strong className={muted ? 'font-semibold text-white/75' : 'text-white'}>{value}</strong>
    </div>
  )
}
