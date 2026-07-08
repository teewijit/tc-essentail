import { useEffect, useRef, useState } from 'react'
import { LogIn, Mail } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import { useLanguage } from '../i18n/useLanguage'
import { isGoogleConfigured, renderGoogleButton } from '../lib/googleAuth'
import { useAuthStore } from '../store/useAuthStore'

export function LoginPage({ onLoggedIn }) {
  const { t } = useLanguage()
  const loginWithGoogleCredential = useAuthStore((state) => state.loginWithGoogleCredential)
  const loginMock = useAuthStore((state) => state.loginMock)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const googleButtonRef = useRef(null)

  useEffect(() => {
    if (!isGoogleConfigured || !googleButtonRef.current) return

    renderGoogleButton(googleButtonRef.current, async (credential) => {
      try {
        await loginWithGoogleCredential(credential)
        onLoggedIn()
      } catch {
        setError(t('login.googleFailed'))
      }
    }).catch(() => setError(t('login.googleLoadFailed')))
  }, [loginWithGoogleCredential, onLoggedIn, t])

  const submitMock = async (event) => {
    event.preventDefault()
    const cleaned = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setError(t('login.invalidEmail'))
      return
    }
    await loginMock(cleaned, cleaned.split('@')[0])
    onLoggedIn()
  }

  return (
    <main className="bg-[#fbfcff]">
      <section className="page-shell flex justify-center py-16">
        <Card className="w-full max-w-md rounded-xl p-0 shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-center text-2xl font-extrabold text-[#061b3a]">{t('login.title')}</h1>
            <p className="mt-2 text-center text-sm text-zinc-600">
              {t('login.copy')}
            </p>

            <div className="mt-8 flex justify-center">
              {isGoogleConfigured ? (
                <div ref={googleButtonRef} />
              ) : (
                <div className="w-full space-y-3">
                  <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    {t('login.configMissing')}
                  </p>
                  <form onSubmit={submitMock} className="space-y-3">
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="yourname@gmail.com"
                        className="pl-9"
                      />
                    </div>
                    <Button type="submit" className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <LogIn size={18} aria-hidden="true" />
                      {t('login.mockButton')}
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-center text-xs text-red-600">{error}</p>}

            <Separator className="my-6" />
            <p className="text-center text-xs leading-5 text-zinc-500">
              {t('login.terms')}
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
