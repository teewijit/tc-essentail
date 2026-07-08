import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { decodeJwtPayload } from '../lib/googleAuth'

const makeMockToken = (email = 'demo@gmail.com') => `mock-token-${email}`.replace(/\s+/g, '-').toLowerCase()

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      chatToken: null,

      refreshChatToken: async () => {
        const { user } = get()
        if (!user) return false
        set({ chatToken: makeMockToken(user.email) })
        return true
      },

      loginWithGoogleCredential: async (credential) => {
        const payload = decodeJwtPayload(credential)
        const user = {
          id: payload.sub || `mock-google-${payload.email}`,
          name: payload.name || payload.email || 'Demo User',
          email: payload.email || 'demo@gmail.com',
          picture: payload.picture || '',
          provider: 'google-mock',
          loggedInAt: Date.now(),
        }

        set({ user, chatToken: makeMockToken(user.email) })
        return user
      },

      loginMock: async (email = 'demo@gmail.com', name = 'Demo User') => {
        const user = {
          id: `mock-${email}`,
          name,
          email,
          picture: '',
          provider: 'mock',
          loggedInAt: Date.now(),
        }

        set({ user, chatToken: makeMockToken(email) })
        return user
      },

      clearChatToken: () => set({ chatToken: null }),

      logout: () => set({ user: null, chatToken: null }),
    }),
    { name: 'tee-culture:auth' },
  ),
)
