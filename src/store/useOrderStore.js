import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const makeOrderId = () => {
  const now = new Date()
  const stamp = now.toISOString().slice(2, 10).replaceAll('-', '')
  return `TC-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [], // [{ id, items: [{ fabric, qty }], total, address, createdAt, status }]

      addOrder: ({ items, total, address = null }) => {
        const order = {
          id: makeOrderId(),
          items,
          total,
          address,
          createdAt: Date.now(),
          status: 'pending', // pending | confirmed | shipped | done
        }
        set({ orders: [order, ...get().orders] })
        return order
      },
    }),
    { name: 'tee-culture:orders' },
  ),
)
