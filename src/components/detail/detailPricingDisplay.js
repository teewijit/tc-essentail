const STOCK_STEP_KG = 50

function getApproximateStockKg(stockKg) {
  return Math.floor(stockKg / STOCK_STEP_KG) * STOCK_STEP_KG
}

export function getStockSummary(fabric, language = 'th') {
  const stockKg = fabric.stockKg ?? 200
  const foldCount = fabric.foldCount ?? 10
  const approximateStockKg = getApproximateStockKg(stockKg)
  const units = language === 'en' ? ['Kg', 'Row'] : ['กิโลกรัม', 'พับ']

  return `~${approximateStockKg} ${units[0]} | ${foldCount} ${units[1]}`
}
