export function getFabricName(fabric, language = 'en') {
  if (language === 'th') return fabric.name_th || fabric.localName || fabric.name
  return fabric.name_en || fabric.name
}
