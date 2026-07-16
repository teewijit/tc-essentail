export function getFabricDescription(fabric, language = 'en') {
  if (language === 'th') return fabric.description_th || fabric.description || ''
  return fabric.description_en || fabric.description || ''
}
