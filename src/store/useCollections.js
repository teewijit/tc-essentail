import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toFabricSnapshot } from './snapshot'

const makeId = () => `f-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

const createCollectionStore = (storageKey) =>
  create(
    persist(
      (set, get) => ({
        items: [], // [{ ...fabricSnapshot, folderId: string|null }]
        folders: [], // [{ id, name }]

        has: (fabricId) => get().items.some((item) => item.id === fabricId),

        toggle: (fabric) => {
          const items = get().items
          if (items.some((item) => item.id === fabric.id)) {
            set({ items: items.filter((item) => item.id !== fabric.id) })
            return false
          }
          set({ items: [{ ...toFabricSnapshot(fabric), folderId: null }, ...items] })
          return true
        },

        remove: (fabricId) =>
          set({ items: get().items.filter((item) => item.id !== fabricId) }),

        createFolder: (name) => {
          const cleaned = (name || '').trim()
          if (!cleaned) return null
          const duplicated = get().folders.some(
            (folder) => folder.name.toLowerCase() === cleaned.toLowerCase(),
          )
          if (duplicated) return null
          const folder = { id: makeId(), name: cleaned }
          set({ folders: [...get().folders, folder] })
          return folder
        },

        renameFolder: (folderId, name) => {
          const cleaned = (name || '').trim()
          if (!cleaned) return
          set({
            folders: get().folders.map((folder) =>
              folder.id === folderId ? { ...folder, name: cleaned } : folder,
            ),
          })
        },

        // ลบโฟลเดอร์ — รายการข้างในย้ายกลับไป "ไม่จัดโฟลเดอร์" (ไม่ลบรายการ)
        deleteFolder: (folderId) =>
          set({
            folders: get().folders.filter((folder) => folder.id !== folderId),
            items: get().items.map((item) =>
              item.folderId === folderId ? { ...item, folderId: null } : item,
            ),
          }),

        moveItem: (fabricId, folderId) =>
          set({
            items: get().items.map((item) =>
              item.id === fabricId ? { ...item, folderId: folderId || null } : item,
            ),
          }),
      }),
      {
        name: storageKey,
        version: 1,
        // migrate ข้อมูลเก่าที่ยังไม่มี folders/folderId
        migrate: (persisted) => ({
          folders: [],
          ...persisted,
          items: (persisted?.items || []).map((item) => ({ folderId: null, ...item })),
        }),
      },
    ),
  )

export const useFavoritesStore = createCollectionStore('tee-culture:favorites')
export const useBookmarksStore = createCollectionStore('tee-culture:bookmarks')

export const selectCount = (state) => state.items.length
