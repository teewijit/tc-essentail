import { useEffect, useState } from 'react'
import {
  Bookmark,
  Clock,
  FolderPlus,
  Heart,
  LogOut,
  MapPin,
  Plus,
  Receipt,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import { FabricCard } from '../components/product/FabricCard'
import { FabricSwatch } from '../components/product/FabricSwatch'
import { formatPrice } from '../lib/format'
import { useNow } from '../hooks/useNow'
import { useAddressStore } from '../store/useAddressStore'
import { useAuthStore } from '../store/useAuthStore'
import { useBookmarksStore, useFavoritesStore } from '../store/useCollections'
import { useOrderStore } from '../store/useOrderStore'
import { formatTimeLeft, useActiveReservations, useReservationStore } from '../store/useReservationStore'

const TABS = [
  ['favorites', 'รายการโปรด', Heart],
  ['bookmarks', 'บุ๊กมาร์ก', Bookmark],
  ['reservations', 'การจองผ้า', Clock],
  ['orders', 'คำสั่งซื้อ', Receipt],
  ['addresses', 'ที่อยู่จัดส่ง', MapPin],
]

const ORDER_STATUS = {
  pending: ['รอยืนยัน', 'bg-amber-50 text-amber-700'],
  confirmed: ['ยืนยันแล้ว', 'bg-blue-50 text-blue-700'],
  shipped: ['จัดส่งแล้ว', 'bg-violet-50 text-violet-700'],
  done: ['สำเร็จ', 'bg-emerald-50 text-emerald-700'],
}

export function ProfilePage({ goLogin, openDetail, openDetailById }) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const favoriteCount = useFavoritesStore((state) => state.items.length)
  const bookmarkCount = useBookmarksStore((state) => state.items.length)
  const orderCount = useOrderStore((state) => state.orders.length)
  const addressCount = useAddressStore((state) => state.addresses.length)
  const reservations = useActiveReservations()
  const prune = useReservationStore((state) => state.prune)
  const [tab, setTab] = useState('favorites')
  const now = useNow()

  useEffect(() => {
    prune()
  }, [prune, now])

  if (!user) {
    return (
      <main className="bg-[#fbfcff]">
        <section className="page-shell flex justify-center py-16">
          <Card className="w-full max-w-md rounded-xl p-0 text-center shadow-sm">
            <CardContent className="p-8">
              <UserRound size={40} className="mx-auto text-zinc-300" aria-hidden="true" />
              <h1 className="mt-4 text-xl font-extrabold text-[#061b3a]">ยังไม่ได้เข้าสู่ระบบ</h1>
              <p className="mt-2 text-sm text-zinc-600">เข้าสู่ระบบด้วย Gmail เพื่อดูโปรไฟล์และรายการที่บันทึกไว้</p>
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={goLogin}>
                เข้าสู่ระบบ
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    )
  }

  const counts = {
    favorites: favoriteCount,
    bookmarks: bookmarkCount,
    reservations: reservations.length,
    orders: orderCount,
    addresses: addressCount,
  }

  return (
    <main className="bg-[#fbfcff]">
      <section className="page-shell py-8">
        <AccountCard user={user} logout={logout} />

        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map(([key, label, Icon]) => (
            <Button
              key={key}
              variant={tab === key ? 'dark' : 'outline'}
              onClick={() => setTab(key)}
              className="gap-2"
            >
              <Icon size={16} aria-hidden="true" />
              {label} ({counts[key]})
            </Button>
          ))}
        </div>

        <div className="mt-5">
          {tab === 'favorites' && (
            <CollectionSection
              key="favorites"
              useStore={useFavoritesStore}
              openDetail={openDetail}
              emptyMessage="ยังไม่มีรายการโปรด กดรูปหัวใจที่สินค้าเพื่อบันทึก"
            />
          )}
          {tab === 'bookmarks' && (
            <CollectionSection
              key="bookmarks"
              useStore={useBookmarksStore}
              openDetail={openDetail}
              emptyMessage="ยังไม่มีบุ๊กมาร์ก กดรูปบุ๊กมาร์กในหน้าสินค้าเพื่อบันทึก"
            />
          )}
          {tab === 'reservations' && (
            <ReservationsSection reservations={reservations} openDetailById={openDetailById} now={now} />
          )}
          {tab === 'orders' && <OrdersSection />}
          {tab === 'addresses' && <AddressesSection />}
        </div>
      </section>
    </main>
  )
}

/* ---------- ข้อมูลส่วนตัว (แสดงอย่างเดียว) ---------- */

function AccountCard({ user, logout }) {
  return (
    <Card className="rounded-xl p-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-4">
          {user.picture ? (
            <img src={user.picture} alt="" className="size-14 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="grid size-14 place-items-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="flex-1">
            <h1 className="text-lg font-extrabold text-[#061b3a]">{user.name}</h1>
            <p className="text-sm text-zinc-600">{user.email}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut size={16} aria-hidden="true" />
            ออกจากระบบ
          </Button>
        </div>
        <Separator className="my-4" />
        <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-zinc-500">ประเภทบัญชี</dt>
            <dd className="font-bold text-[#061b3a]">
              {user.provider === 'google' ? 'Google Account' : 'บัญชีโหมดทดลอง (Mock)'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">อีเมล</dt>
            <dd className="font-bold text-[#061b3a]">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">เข้าสู่ระบบล่าสุด</dt>
            <dd className="font-bold text-[#061b3a]">
              {user.loggedInAt
                ? new Date(user.loggedInAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })
                : '-'}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

/* ---------- รายการโปรด / บุ๊กมาร์ก พร้อมระบบโฟลเดอร์ ---------- */

function CollectionSection({ useStore, openDetail, emptyMessage }) {
  const items = useStore((state) => state.items)
  const folders = useStore((state) => state.folders)
  const createFolder = useStore((state) => state.createFolder)
  const deleteFolder = useStore((state) => state.deleteFolder)
  const moveItem = useStore((state) => state.moveItem)
  const removeItem = useStore((state) => state.remove)

  const [activeFolder, setActiveFolder] = useState('all') // all | none | <folderId>
  const [creating, setCreating] = useState(false)
  const [folderName, setFolderName] = useState('')

  const visibleItems = items.filter((item) => {
    if (activeFolder === 'all') return true
    if (activeFolder === 'none') return !item.folderId
    return item.folderId === activeFolder
  })

  const countIn = (folderId) => items.filter((item) => item.folderId === folderId).length
  const unfiledCount = items.filter((item) => !item.folderId).length

  const submitFolder = (event) => {
    event.preventDefault()
    const folder = createFolder(folderName)
    if (folder) {
      setFolderName('')
      setCreating(false)
      setActiveFolder(folder.id)
    }
  }

  const removeFolder = (folderId) => {
    deleteFolder(folderId)
    if (activeFolder === folderId) setActiveFolder('all')
  }

  if (items.length === 0 && folders.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div>
      {/* แถบโฟลเดอร์ */}
      <div className="flex flex-wrap items-center gap-2">
        <FolderChip active={activeFolder === 'all'} onClick={() => setActiveFolder('all')}>
          ทั้งหมด ({items.length})
        </FolderChip>
        <FolderChip active={activeFolder === 'none'} onClick={() => setActiveFolder('none')}>
          ไม่จัดโฟลเดอร์ ({unfiledCount})
        </FolderChip>
        {folders.map((folder) => (
          <FolderChip
            key={folder.id}
            active={activeFolder === folder.id}
            onClick={() => setActiveFolder(folder.id)}
            onDelete={() => removeFolder(folder.id)}
          >
            {folder.name} ({countIn(folder.id)})
          </FolderChip>
        ))}

        {creating ? (
          <form onSubmit={submitFolder} className="flex items-center gap-2">
            <Input
              autoFocus
              value={folderName}
              onChange={(event) => setFolderName(event.target.value)}
              placeholder="ชื่อโฟลเดอร์..."
              maxLength={30}
              className="h-11 w-40"
            />
            <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={14} aria-hidden="true" />
              สร้าง
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="ยกเลิก" onClick={() => setCreating(false)}>
              <X size={14} aria-hidden="true" />
            </Button>
          </form>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setCreating(true)} className="gap-1.5 border-dashed">
            <FolderPlus size={14} aria-hidden="true" />
            สร้างโฟลเดอร์
          </Button>
        )}
      </div>

      {/* รายการสินค้า */}
      {visibleItems.length === 0 ? (
        <div className="mt-4">
          <EmptyState message="ยังไม่มีรายการในโฟลเดอร์นี้ — เลือกโฟลเดอร์จากเมนูใต้สินค้าเพื่อย้ายเข้ามา" />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((fabric) => (
            <div key={fabric.id}>
              <FabricCard fabric={fabric} onOpen={() => openDetail(fabric)} />
              <div className="mt-2 flex items-center gap-1.5">
                <select
                  value={fabric.folderId || ''}
                  onChange={(event) => moveItem(fabric.id, event.target.value || null)}
                  aria-label="ย้ายไปโฟลเดอร์"
                  className="h-10 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-2 text-xs text-zinc-700 outline-none focus:border-[#061b3a]"
                >
                  <option value="">ไม่จัดโฟลเดอร์</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))}
                </select>
                <Button variant="ghost" size="icon-sm" aria-label="ลบออกจากรายการ" onClick={() => removeItem(fabric.id)}>
                  <Trash2 size={15} className="text-zinc-400 hover:text-red-500" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FolderChip({ active, onClick, onDelete, children }) {
  return (
    <span
      className={`inline-flex items-center overflow-hidden rounded-full border text-xs font-bold transition-colors ${
        active
          ? 'border-[#061b3a] bg-[#061b3a] text-white'
          : 'border-zinc-200 bg-white text-zinc-600 hover:border-[#061b3a] hover:text-[#061b3a]'
      }`}
    >
      <button type="button" onClick={onClick} className={`px-3 py-1.5 ${onDelete ? 'pr-1.5' : ''}`}>
        {children}
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="ลบโฟลเดอร์"
          title="ลบโฟลเดอร์ (รายการข้างในจะกลับไปอยู่ ไม่จัดโฟลเดอร์)"
          className={`pr-2.5 pl-0.5 ${active ? 'text-white/70 hover:text-white' : 'text-zinc-400 hover:text-red-500'}`}
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </span>
  )
}

/* ---------- การจองผ้า ---------- */

function ReservationsSection({ reservations, openDetailById, now }) {
  const cancel = useReservationStore((state) => state.cancel)

  if (reservations.length === 0) {
    return <EmptyState message="ยังไม่มีการจองผ้า กด RESERVE 48 HOURS ในหน้าสินค้าเพื่อจอง" />
  }

  return (
    <div className="space-y-3">
      {reservations.map(({ fabric, reservedAt, expiresAt }) => (
        <Card key={fabric.id} className="rounded-xl p-0 shadow-sm">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <button type="button" onClick={() => openDetailById(fabric.id)} className="shrink-0">
              <FabricSwatch fabric={fabric} className="h-16 w-20 rounded-lg" />
            </button>
            <div className="min-w-40 flex-1">
              <h2 className="text-sm font-extrabold text-[#061b3a]">{fabric.code}</h2>
              <p className="text-xs text-zinc-600">{fabric.name}</p>
              <p className="mt-1 text-xs text-zinc-500">
                จองเมื่อ {new Date(reservedAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              <Clock size={13} aria-hidden="true" />
              เหลือ {formatTimeLeft(expiresAt, now)}
            </span>
            <Button variant="outline" size="sm" onClick={() => cancel(fabric.id)}>
              ยกเลิกการจอง
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ---------- ประวัติคำสั่งซื้อ ---------- */

function OrdersSection() {
  const orders = useOrderStore((state) => state.orders)

  if (orders.length === 0) {
    return <EmptyState message="ยังไม่มีประวัติคำสั่งซื้อ — สั่งซื้อจากตะกร้าแล้วรายการจะแสดงที่นี่" />
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const [statusLabel, statusClass] = ORDER_STATUS[order.status] || ORDER_STATUS.pending
        return (
          <Card key={order.id} className="rounded-xl p-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1">
                  <h2 className="text-sm font-extrabold text-[#061b3a]">{order.id}</h2>
                  <p className="text-xs text-zinc-500">
                    {new Date(order.createdAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <Badge className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}>{statusLabel}</Badge>
                <strong className="text-sm text-[#061b3a]">{formatPrice(order.total)}</strong>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1 text-xs text-zinc-600">
                {order.items.map(({ fabric, qty }) => (
                  <div key={fabric.id} className="flex justify-between">
                    <span>{fabric.code} — {fabric.name}</span>
                    <span>{qty} KG × {formatPrice(fabric.price)}</span>
                  </div>
                ))}
              </div>
              {order.address && (
                <p className="mt-3 rounded-md bg-zinc-50 px-3 py-2 text-xs text-zinc-500">
                  จัดส่ง: {order.address.name} • {order.address.phone} • {order.address.address} {order.address.province} {order.address.postcode}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

/* ---------- ที่อยู่จัดส่ง ---------- */

const EMPTY_ADDRESS_FORM = { label: '', name: '', phone: '', address: '', province: '', postcode: '' }

function AddressesSection() {
  const addresses = useAddressStore((state) => state.addresses)
  const defaultId = useAddressStore((state) => state.defaultId)
  const addAddress = useAddressStore((state) => state.addAddress)
  const removeAddress = useAddressStore((state) => state.removeAddress)
  const setDefault = useAddressStore((state) => state.setDefault)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_ADDRESS_FORM)
  const [error, setError] = useState('')

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('กรุณากรอก ชื่อผู้รับ เบอร์โทร และที่อยู่ ให้ครบ')
      return
    }
    addAddress(form)
    setForm(EMPTY_ADDRESS_FORM)
    setError('')
    setShowForm(false)
  }

  return (
    <div className="space-y-3">
      {addresses.length === 0 && !showForm && (
        <EmptyState message="ยังไม่มีที่อยู่จัดส่ง — เพิ่มที่อยู่เพื่อใช้ตอนสั่งซื้อ" />
      )}

      {addresses.map((address) => {
        const isDefault = address.id === defaultId
        return (
          <Card key={address.id} className={`rounded-xl p-0 shadow-sm ${isDefault ? 'border-[#061b3a]' : ''}`}>
            <CardContent className="flex flex-wrap items-start gap-3 p-4">
              <div className="min-w-48 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-extrabold text-[#061b3a]">{address.label}</h2>
                  {isDefault && (
                    <Badge className="rounded-full bg-[#061b3a] px-2 py-0.5 text-xs text-white">ค่าเริ่มต้น</Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-zinc-700">{address.name} • {address.phone}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {address.address} {address.province} {address.postcode}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isDefault && (
                  <Button variant="outline" size="sm" onClick={() => setDefault(address.id)}>
                    ใช้ที่อยู่นี้
                  </Button>
                )}
                <Button variant="ghost" size="icon-sm" aria-label="ลบที่อยู่" onClick={() => removeAddress(address.id)}>
                  <Trash2 size={15} className="text-zinc-400 hover:text-red-500" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {showForm ? (
        <Card className="rounded-xl p-0 shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-sm font-extrabold text-[#061b3a]">เพิ่มที่อยู่ใหม่</h2>
            <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <Input value={form.label} onChange={setField('label')} placeholder="ชื่อที่อยู่ เช่น บ้าน / ออฟฟิศ" maxLength={40} />
              <Input value={form.name} onChange={setField('name')} placeholder="ชื่อผู้รับ *" maxLength={80} />
              <Input value={form.phone} onChange={setField('phone')} placeholder="เบอร์โทร *" maxLength={20} />
              <Input value={form.province} onChange={setField('province')} placeholder="จังหวัด" maxLength={40} />
              <Input
                value={form.address}
                onChange={setField('address')}
                placeholder="ที่อยู่ (บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ) *"
                maxLength={200}
                className="sm:col-span-2"
              />
              <Input value={form.postcode} onChange={setField('postcode')} placeholder="รหัสไปรษณีย์" maxLength={10} />
              {error && <p className="text-xs text-red-600 sm:col-span-2">{error}</p>}
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  บันทึกที่อยู่
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setError('') }}>
                  ยกเลิก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} className="gap-2 border-dashed">
          <Plus size={16} aria-hidden="true" />
          เพิ่มที่อยู่ใหม่
        </Button>
      )}
    </div>
  )
}

/* ---------- shared ---------- */

function EmptyState({ message }) {
  return (
    <Card className="rounded-xl border-dashed p-0 shadow-none">
      <CardContent className="p-10 text-center text-sm text-zinc-500">{message}</CardContent>
    </Card>
  )
}
