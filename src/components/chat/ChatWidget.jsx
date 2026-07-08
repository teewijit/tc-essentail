import { BotMessageSquare, Maximize2, X } from 'lucide-react'
import { useChatStore } from '../../store/useChatStore'
import { useLanguage } from '../../i18n/useLanguage'
import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChatConversation } from './ChatConversation'

export function ChatWidget({ goLogin, goFullPage }) {
  const { t } = useLanguage()
  const open = useChatStore((state) => state.open)
  const setOpen = useChatStore((state) => state.setOpen)

  return (
    <>
      {open && (
        <Card className="fixed bottom-24 right-4 z-50 h-[480px] w-[min(380px,calc(100vw-2rem))] gap-0 overflow-hidden rounded-xl border-border p-0 shadow-2xl sm:right-6">
          <CardHeader className="flex flex-row items-center justify-between gap-3 bg-primary px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary border border-black">
                <BotMessageSquare size={21} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <CardTitle className="truncate text-sm font-extrabold text-black">Essie AI</CardTitle>
                <p className="truncate text-xs font-medium text-black/70">{t('chat.assistantLabel')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon-sm" onClick={goFullPage} className="text-black hover:bg-black/10" aria-label={t('actions.openFullChat')}>
                <Maximize2 size={16} aria-hidden="true" />
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => setOpen(false)} className="text-black hover:bg-black/10" aria-label={t('actions.closeChat')}>
                <X size={16} aria-hidden="true" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 bg-white p-0">
            <ChatConversation goLogin={goLogin} compact />
          </CardContent>
        </Card>
      )}

      <Button
        type="button"
        onClick={() => setOpen(!open)}
        size="icon-lg"
        className="fixed bottom-6 right-4 z-50 size-14 rounded-full bg-primary shadow-xl transition hover:scale-105 hover:bg-primary/90 sm:right-6"
        aria-label={open ? t('actions.closeChat') : t('actions.openChat')}
      >
        {open ? <X size={22} aria-hidden="true" /> : <BotMessageSquare size={22} aria-hidden="true" />}
      </Button>
    </>
  )
}
