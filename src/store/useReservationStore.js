import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { toFabricSnapshot } from './snapshot'

export const RESERVATION_HOURS = 48
const RESERVATION_MS = RESERVATION_HOURS * 60 * 60 * 1000

const isActive = (reservation) => reservation.expiresAt > Date.now()

export const useReservationStore = create(
  persist(
    (set, get) => ({
      reservations: [], // [{ fabric, reservedAt, expiresAt }]

      // Drop expired reservations; call before reading the list.
      prune: () => {
        const reservations = get().reservations
        const active = reservations.filter(isActive)
        if (active.length !== reservations.length) {
          set({ reservations: active })
        }
      },

      getReservation: (fabricId) =>
        get().reservations.find(
          (reservation) => reservation.fabric.id === fabricId && isActive(reservation),
        ) || null,

      reserve: (fabric) => {
        get().prune()
        const existing = get().getReservation(fabric.id)
        if (existing) return existing

        const now = Date.now()
        const reservation = {
          fabric: toFabricSnapshot(fabric),
          reservedAt: now,
          expiresAt: now + RESERVATION_MS,
        }
        set({ reservations: [reservation, ...get().reservations] })
        return reservation
      },

      cancel: (fabricId) =>
        set({
          reservations: get().reservations.filter(
            (reservation) => reservation.fabric.id !== fabricId,
          ),
        }),
    }),
    { name: 'tee-culture:reservations' },
  ),
)

export const selectActiveReservations = (state) => state.reservations.filter(isActive)

export function useActiveReservations() {
  return useReservationStore(useShallow(selectActiveReservations))
}

export const formatTimeLeft = (expiresAt, now = Date.now()) => {
  const ms = Math.max(0, expiresAt - now)
  const hours = Math.floor(ms / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  return `${hours} ชม. ${minutes} นาที`
}
