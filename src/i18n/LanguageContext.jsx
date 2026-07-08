import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './languageContext'
import { defaultLanguage, languageStorageKey, languages, translate } from './translations'

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return defaultLanguage
  const saved = window.localStorage.getItem(languageStorageKey)
  return languages.includes(saved) ? saved : defaultLanguage
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  const value = useMemo(() => {
    const setLanguage = (nextLanguage) => {
      if (languages.includes(nextLanguage)) setLanguageState(nextLanguage)
    }

    return {
      language,
      setLanguage,
      t: (key, params) => translate(language, key, params),
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
