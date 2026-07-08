import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const makeId = () => `addr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

export const useAddressStore = create(
  persist(
    (set, get) => ({
      addresses: [], // [{ id, label, name, phone, address, province, postcode }]
      defaultId: null,

      addAddress: (data) => {
        const address = {
          id: makeId(),
          label: (data.label || '').trim() || 'ที่อยู่ของฉัน',
          name: (data.name || '').trim(),
          phone: (data.phone || '').trim(),
          address: (data.address || '').trim(),
          province: (data.province || '').trim(),
          postcode: (data.postcode || '').trim(),
        }
        const addresses = [...get().addresses, address]
        set({
          addresses,
          // ที่อยู่แรกตั้งเป็นค่าเริ่มต้นอัตโนมัติ
          defaultId: get().defaultId || address.id,
        })
        return address
      },

      updateAddress: (id, patch) =>
        set({
          addresses: get().addresses.map((address) =>
            address.id === id ? { ...address, ...patch } : address,
          ),
        }),

      removeAddress: (id) => {
        const addresses = get().addresses.filter((address) => address.id !== id)
        set({
          addresses,
          defaultId: get().defaultId === id ? (addresses[0]?.id ?? null) : get().defaultId,
        })
      },

      setDefault: (id) => set({ defaultId: id }),
    }),
    { name: 'tee-culture:addresses' },
  ),
)

export const selectDefaultAddress = (state) =>
  state.addresses.find((address) => address.id === state.defaultId) || null
