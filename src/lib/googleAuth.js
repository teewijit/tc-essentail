export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export const isGoogleConfigured = Boolean(GOOGLE_CLIENT_ID)

let scriptPromise = null

export function loadGoogleScript() {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google)
    script.onerror = () => reject(new Error('ไม่สามารถโหลด Google Sign-In ได้'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function renderGoogleButton(element, onCredential) {
  const google = await loadGoogleScript()

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  })

  google.accounts.id.renderButton(element, {
    theme: 'outline',
    size: 'large',
    width: 280,
    text: 'signin_with',
  })
}

export function decodeJwtPayload(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes))
}
