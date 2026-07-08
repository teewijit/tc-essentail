import { ArrowLeft, BotMessageSquare, RotateCcw } from 'lucide-react'
import { ChatConversation } from '../components/chat/ChatConversation'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useLanguage } from '../i18n/useLanguage'
import { useChatStore } from '../store/useChatStore'

export function ChatPage({ goHome, goLogin }) {
  const { t } = useLanguage()
  const resetChat = useChatStore((state) => state.resetChat)

  return (
    <main className="bg-[#fbfcff]">
      <section className="page-shell flex justify-center py-8">
        <Card className="h-[calc(100vh-220px)] min-h-[480px] w-full max-w-3xl gap-0 overflow-hidden rounded-xl p-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <Button type="button" variant="ghost" size="icon-sm" onClick={goHome} className="text-muted-foreground" aria-label={t('actions.backHome')}>
                <ArrowLeft size={18} aria-hidden="true" />
              </Button>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <BotMessageSquare size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <CardTitle className="truncate text-base font-extrabold text-primary">Essie AI</CardTitle>
                <p className="truncate text-xs text-muted-foreground">{t('chat.assistantLabel')}</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={resetChat} className="text-muted-foreground hover:text-primary">
              <RotateCcw size={14} aria-hidden="true" />
              {t('actions.newChat')}
            </Button>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 p-0">
            <ChatConversation goLogin={goLogin} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
