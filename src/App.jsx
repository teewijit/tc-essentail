import { useCallback, useEffect, useState } from 'react'
import { ChatWidget } from './components/chat/ChatWidget'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { TooltipProvider } from './components/ui/tooltip'
import { useFabricData } from './hooks/useFabricData'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { ChatPage } from './pages/ChatPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { FabricDetailPage } from './pages/FabricDetailPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import './App.css'

function App() {
  const [view, setView] = useState('home')
  const {
    catalog,
    filters,
    homeData,
    loading,
    query,
    selectedFabric,
    sort,
    openDetail,
    openDetailById,
    setFilters,
    setQuery,
    setSort,
  } = useFabricData()

  const openCatalog = useCallback((preset = {}) => {
    if (preset.type || preset.color || preset.usage || preset.gsm || preset.width) {
      setFilters((current) => {
        const next = {
          ...current,
          type: preset.type || current.type,
          color: preset.color || current.color,
          usage: preset.usage || current.usage,
          gsm: preset.gsm || current.gsm,
          width: preset.width || current.width,
        }
        // คืน object เดิมถ้าค่าไม่เปลี่ยน — กัน re-render loop ตอนโหลด URL ที่มี query
        const changed = Object.keys(next).some((key) => next[key] !== current[key])
        return changed ? next : current
      })
    }
    setView('catalog')
  }, [setFilters])

  useEffect(() => {
    const navigateFromHash = async (hash) => {
      if (!hash || hash === '#') return

      const cleaned = hash.replace(/^#\/?/, '')
      const [path, queryString = ''] = cleaned.split('?')
      const params = Object.fromEntries(new URLSearchParams(queryString))

      if (path === 'home' || path === '') {
        setView('home')
        return
      }

      if (path === 'catalog') {
        openCatalog(params)
        return
      }

      if (['login', 'profile', 'cart', 'chat'].includes(path)) {
        setView(path)
        return
      }

      if (path.startsWith('fabric/')) {
        const fabricId = decodeURIComponent(path.slice('fabric/'.length))
        if (fabricId) {
          await openDetailById(fabricId, setView)
        }
      }
    }

    navigateFromHash(window.location.hash)

    const onHashChange = () => {
      navigateFromHash(window.location.hash)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [openCatalog, openDetailById])

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <SiteHeader currentView={view} setView={setView} />
        <div className="flex-1">
        {view === 'home' && (
          <HomePage
            homeData={homeData}
            catalogItems={catalog.items}
            query={query}
            setQuery={setQuery}
            openCatalog={openCatalog}
            openDetail={(fabric) => openDetail(fabric, setView)}
          />
        )}
        {view === 'catalog' && (
          <CatalogPage
            query={query}
            setQuery={setQuery}
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
            catalog={catalog}
            loading={loading}
            openDetail={(fabric) => openDetail(fabric, setView)}
          />
        )}
        {view === 'detail' && (
          <FabricDetailPage
            fabric={selectedFabric}
            goBack={() => setView('catalog')}
            openDetail={(fabric) => openDetail(fabric, setView)}
            goCart={() => setView('cart')}
          />
        )}
        {view === 'login' && <LoginPage onLoggedIn={() => setView('profile')} />}
        {view === 'profile' && (
          <ProfilePage
            goLogin={() => setView('login')}
            openDetail={(fabric) => openDetail(fabric, setView)}
            openDetailById={(fabricId) => openDetailById(fabricId, setView)}
          />
        )}
        {view === 'cart' && (
          <CartPage
            goCatalog={() => setView('catalog')}
            goLogin={() => setView('login')}
            openDetailById={(fabricId) => openDetailById(fabricId, setView)}
          />
        )}
        {view === 'chat' && (
          <ChatPage goHome={() => setView('home')} goLogin={() => setView('login')} />
        )}
        {['collection', 'about', 'contact', 'color', 'usage', 'inspiration', 'location'].includes(view) && (
          <ComingSoonPage page={view} goHome={() => setView('home')} goCatalog={() => setView('catalog')} />
        )}
        </div>
        <SiteFooter />
        {view !== 'chat' && (
          <ChatWidget
            goLogin={() => setView('login')}
            goFullPage={() => setView('chat')}
          />
        )}
      </div>
    </TooltipProvider>
  )
}

export default App
