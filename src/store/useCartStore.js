import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toFabricSnapshot } from './snapshot'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ fabric, qty }] — qty in KG

      addItem: (fabric, qty = 1) => {
        const items = get().items
        const existing = items.find((item) => item.fabric.id === fabric.id)

        if (existing) {
          set({
            items: items.map((item) =>
              item.fabric.id === fabric.id ? { ...item, qty: item.qty + qty } : item,
            ),
          })
          return
        }

        set({ items: [...items, { fabric: toFabricSnapshot(fabric), qty }] })
      },

      setQty: (fabricId, qty) => {
        if (qty <= 0) {
          get().removeItem(fabricId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.fabric.id === fabricId ? { ...item, qty } : item,
          ),
        })
      },

      removeItem: (fabricId) =>
        set({ items: get().items.filter((item) => item.fabric.id !== fabricId) }),

      clear: () => set({ items: [] }),
    }),
    { name: 'tee-culture:cart' },
  ),
)

// Selectors — subscribe to derived values without re-rendering on unrelated changes
export const selectCartCount = (state) => state.items.reduce((sum, item) => sum + item.qty, 0)
export const selectCartTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.fabric.price * item.qty, 0)
