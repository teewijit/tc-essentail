import { create } from 'zustand'
import { sendChatMessage } from '../lib/chatApi'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'สวัสดีค่ะ ฉันคือ Essie ผู้ช่วย TEE CULTURE ตอนนี้อยู่ในโหมด mockup ถามเรื่องผ้า ราคา สี สต็อก หรือให้ช่วยเลือกผ้าได้เลยค่ะ',
  links: [],
}

export const useChatStore = create((set, get) => ({
  open: false,
  messages: [WELCOME_MESSAGE],
  sending: false,

  setOpen: (open) => set({ open }),
  toggleOpen: () => set((state) => ({ open: !state.open })),

  resetChat: () => set({ messages: [WELCOME_MESSAGE], sending: false }),

  sendMessage: async (question) => {
    const cleaned = question.trim()
    if (!cleaned || get().sending) return

    set((state) => ({
      messages: [...state.messages, { role: 'user', content: cleaned, links: [] }],
      sending: true,
    }))

    try {
      const result = await sendChatMessage({ question: cleaned })
      set((state) => ({
        messages: [
          ...state.messages,
          {
            role: 'assistant',
            content: result.answer,
            links: result.links || [],
          },
        ],
        sending: false,
      }))
    } catch {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            role: 'assistant',
            content: 'ตอนนี้ระบบแชท mockup ตอบกลับไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ',
            links: [],
            isError: true,
          },
        ],
        sending: false,
      }))
    }
  },
}))
