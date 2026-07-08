import { useEffect, useRef, useState } from 'react'
import { BotMessageSquare, LogIn, SendHorizonal, Sparkles, UserRound } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { useAuthStore } from '../../store/useAuthStore'
import { useChatStore } from '../../store/useChatStore'
import { Badge } from '../ui/badge'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-primary text-black">
          <BotMessageSquare size={15} aria-hidden="true" />
        </span>
      )}
      <Card
        className={`max-w-[85%] gap-0 rounded-2xl p-0 shadow-none ${
          isUser
            ? 'bg-primary text-black'
            : message.isError
              ? 'border-destructive/20 bg-destructive/10 text-destructive'
              : 'bg-muted text-foreground'
        }`}
      >
        <CardContent className="p-3 text-sm leading-6 whitespace-pre-wrap">
          {message.content}
          {message.links?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.links.map((link) => (
                <Badge key={link.url} asChild variant="outline" className="bg-background text-primary hover:bg-primary hover:text-black">
                  <a href={link.url}>{link.label}</a>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {isUser && (
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-primary/20 text-black">
          <UserRound size={15} aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

export function ChatConversation({ goLogin, compact = false }) {
  const { t } = useLanguage()
  const user = useAuthStore((state) => state.user)
  const chatToken = useAuthStore((state) => state.chatToken)
  const refreshChatToken = useAuthStore((state) => state.refreshChatToken)
  const messages = useChatStore((state) => state.messages)
  const sending = useChatStore((state) => state.sending)
  const sendMessage = useChatStore((state) => state.sendMessage)
  const [input, setInput] = useState('')
  const [reconnecting, setReconnecting] = useState(false)
  const [reconnectError, setReconnectError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  useEffect(() => {
    if (user?.provider === 'mock' && !chatToken) {
      refreshChatToken()
    }
  }, [user, chatToken, refreshChatToken])

  const submit = (event) => {
    event.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  const reconnect = async () => {
    setReconnecting(true)
    setReconnectError('')
    const ok = await refreshChatToken()
    if (!ok) {
      setReconnectError(
        user?.provider === 'google'
          ? t('chat.googleExpired')
          : t('chat.backendError'),
      )
    }
    setReconnecting(false)
  }

  if (!user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-black">
          <BotMessageSquare size={28} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-extrabold text-foreground">{t('chat.loginTitle')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('chat.loginCopy')}</p>
        </div>
        <Button onClick={goLogin} className="h-12 px-6 text-black">
          <LogIn size={16} aria-hidden="true" />
          {t('actions.login')}
        </Button>
      </div>
    )
  }

  if (!chatToken) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-black">
          <BotMessageSquare size={28} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-extrabold text-foreground">{t('chat.noConnectionTitle')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('chat.noConnectionCopy')}</p>
        </div>
        {user.provider === 'google' ? (
          <Button onClick={goLogin} className="h-12 px-6 text-black">
            <LogIn size={16} aria-hidden="true" />
            {t('actions.loginAgain')}
          </Button>
        ) : (
          <Button onClick={reconnect} disabled={reconnecting} className="h-12 px-6 text-black">
            {reconnecting ? t('actions.connecting') : t('actions.reconnect')}
          </Button>
        )}
        {reconnectError && <p className="max-w-xs text-xs leading-5 text-destructive">{reconnectError}</p>}
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className={`flex-1 space-y-3 overflow-y-auto ${compact ? 'p-4' : 'p-6'}`}>
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-black">
              <BotMessageSquare size={15} aria-hidden="true" />
            </span>
            <Badge variant="secondary" className="h-8 rounded-full px-3">
              {t('chat.typing')}
            </Badge>
          </div>
        )}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {t('chat.suggestions').map((text) => (
              <Button key={text} type="button" variant="outline" size="xs" onClick={() => sendMessage(text)} className="rounded-full border-border bg-white text-black hover:border-primary hover:bg-primary/10">
                <Sparkles size={12} aria-hidden="true" />
                {text}
              </Button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <Separator />
      <form onSubmit={submit} className={`flex items-end gap-2 bg-white ${compact ? 'p-3' : 'p-4'}`}>
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submit(event)
            }
          }}
          maxLength={500}
          rows={1}
          placeholder={t('chat.placeholder')}
          className="max-h-32 min-h-12 resize-none rounded-xl bg-muted/40 py-2.5 text-sm"
        />
        <Button type="submit" disabled={sending || !input.trim()} size="icon-lg" className="rounded-full bg-primary text-black hover:bg-primary/90" aria-label={t('actions.sendMessage')}>
          <SendHorizonal size={17} aria-hidden="true" />
        </Button>
      </form>
    </div>
  )
}
