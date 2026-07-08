const HOME_FEATURED_PLACEMENT = 'home_featured_deals'

export const isPromotionActive = (promotion, now = new Date()) => {
  if (!promotion?.isActive) return false

  const current = now.getTime()
  const startsAt = promotion.startsAt ? new Date(promotion.startsAt).getTime() : null
  const endsAt = promotion.endsAt ? new Date(promotion.endsAt).getTime() : null

  if (startsAt !== null && current < startsAt) return false
  if (endsAt !== null && current > endsAt) return false

  return true
}

export const sortPromotionItems = (items = []) =>
  [...items].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

export const sortPromotions = (promotions = []) =>
  [...promotions].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

export const getActivePromotion = (
  promotions = [],
  placement = HOME_FEATURED_PLACEMENT,
  now = new Date(),
) => {
  const active = sortPromotions(promotions).find(
    (promotion) => promotion.placement === placement && isPromotionActive(promotion, now),
  )

  if (!active) return null

  return {
    ...active,
    items: sortPromotionItems(active.items),
  }
}

export const resolvePromotionItems = (promotion, catalogItems = [], fallbackFabrics = []) => {
  if (!promotion?.items?.length) return []

  const fabricById = new Map(
    [...catalogItems, ...fallbackFabrics].map((fabric) => [fabric.id, fabric]),
  )

  return promotion.items
    .map((item) => {
      const fabric = fabricById.get(item.fabricId)
      if (!fabric) return null

      const compareAtPrice = item.compareAtPrice ?? fabric.price
      const promoPrice = item.promoPrice

      return {
        ...item,
        fabric,
        compareAtPrice,
        promoPrice,
        discountPercent:
          compareAtPrice > promoPrice
            ? Math.round(((compareAtPrice - promoPrice) / compareAtPrice) * 100)
            : 0,
      }
    })
    .filter(Boolean)
}

export const getLocalizedText = (value, language) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[language] || value.th || value.en || ''
}
