import { useCallback, useEffect, useState } from 'react'
import { fabrics } from '../data/fabrics'
import { api, fallbackCatalog } from '../lib/api'

export function useFabricData() {
  const [query, setQuery] = useState('')
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0])
  const [homeData, setHomeData] = useState(null)
  const [catalog, setCatalog] = useState(fallbackCatalog)
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('Latest')
  const [filters, setFilters] = useState({
    type: 'All',
    fabric_type: 'All',
    category: 'All',
    color: 'All',
    gsm: 'All',
    width: 'All',
    usage: 'All',
  })

  useEffect(() => {
    let active = true

    api.home().then((data) => {
      if (active) setHomeData(data)
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    Promise.resolve()
      .then(() => {
        if (active) setLoading(true)
        return api.catalog({ search: query, filters, sort })
      })
      .then((data) => {
        if (active) setCatalog(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [filters, query, sort])

  const openDetail = useCallback((fabric, setView) => {
    setSelectedFabric(fabric)
    setView('detail')
  }, [])

  const openDetailById = useCallback((fabricId, setView) => {
    const fabric =
      catalog.items.find((item) => item.id === fabricId) ||
      fabrics.find((item) => item.id === fabricId)

    if (!fabric) {
      setView('catalog')
      return
    }

    setSelectedFabric(fabric)
    setView('detail')
  }, [catalog.items])

  return {
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
  }
}
