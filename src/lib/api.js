import { fabrics as mockFabrics } from '../data/fabrics'
import { mockHomePromotions } from '../data/promotions'

const cloneFabric = (fabric) => ({ ...fabric, highlights: [...fabric.highlights] })

const matchesSearch = (fabric, search) => {
  if (!search) return true

  const query = search.trim().toLowerCase()
  return [fabric.code, fabric.name, fabric.color, fabric.type, fabric.usage]
    .some((value) => value.toLowerCase().includes(query))
}

const matchesFilter = (fabric, filters) => {
  if (filters.type && filters.type !== 'All' && fabric.type !== filters.type) {
    return false
  }

  if (filters.color && filters.color !== 'All') {
    const color = filters.color.split(' ')[0].toLowerCase()
    if (!fabric.color.toLowerCase().startsWith(color)) {
      return false
    }
  }

  if (filters.usage && filters.usage !== 'All' && fabric.usage !== filters.usage) {
    return false
  }

  if (filters.gsm && filters.gsm !== 'All' && String(fabric.gsm) !== String(filters.gsm)) {
    return false
  }

  if (filters.width && filters.width !== 'All' && String(fabric.width) !== String(filters.width)) {
    return false
  }

  return true
}

const sortFabrics = (items, sort) => {
  const sorted = [...items]

  if (sort === 'Popular') {
    return sorted.sort(
      (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.code.localeCompare(b.code),
    )
  }

  if (sort === 'Name') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'))
  }

  return sorted.sort(
    (a, b) => Number(b.isNew) - Number(a.isNew) || a.code.localeCompare(b.code),
  )
}

const filterCatalog = ({ search, filters, sort }) => {
  const items = sortFabrics(
    mockFabrics.filter((fabric) => matchesSearch(fabric, search) && matchesFilter(fabric, filters)),
    sort,
  )

  return {
    items: items.map(cloneFabric),
    count: items.length,
    filters,
    source: 'mock',
  }
}

export const fallbackCatalog = filterCatalog({
  search: '',
  filters: { type: 'All', color: 'All', gsm: 'All', width: 'All', usage: 'All' },
  sort: 'Latest',
})

const findFabric = (id) => mockFabrics.find((fabric) => fabric.id === id)

export const api = {
  async home() {
    const newArrivals = mockFabrics.filter((fabric) => fabric.isNew).map(cloneFabric)
    const popularFabrics = mockFabrics.filter((fabric) => fabric.isPopular).map(cloneFabric)
    const recommended = mockFabrics.slice(0, 4).map(cloneFabric)

    return {
      newArrivals,
      popularFabrics,
      recommended,
      promotions: mockHomePromotions,
      source: 'mock',
    }
  },

  async catalog(params) {
    return filterCatalog(params)
  },

  async detail(id) {
    const fabric = findFabric(id)
    if (!fabric) {
      throw new Error(`Fabric not found: ${id}`)
    }
    return cloneFabric(fabric)
  },

  async spec(id) {
    const fabric = findFabric(id)
    if (!fabric) {
      throw new Error(`Fabric not found: ${id}`)
    }

    return {
      qr_payload: `#/fabric/${encodeURIComponent(fabric.id)}`,
      code: fabric.code,
      name: fabric.name,
    }
  },

  async save() {
    return { ok: true }
  },

  async addToFolder() {
    return { ok: true }
  },

  async reserve() {
    return { ok: true }
  },
}
