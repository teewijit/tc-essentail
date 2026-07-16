export function formatFabricLength(fabric, language = 'en') {
  const value = fabric.lengthYardPerKg

  if (value === undefined || value === null || value === '') {
    return '-'
  }

  return language === 'th' ? `${value} หลา/กก.` : `${value} yd/kg`
}
