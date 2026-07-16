// Keep only the fields we need so localStorage stays small
// and persisted items stay renderable even if the catalog changes.
export const toFabricSnapshot = (fabric) => ({
  id: fabric.id,
  code: fabric.code,
  name: fabric.name,
  name_en: fabric.name_en,
  name_th: fabric.name_th,
  localName: fabric.localName,
  description_en: fabric.description_en,
  description_th: fabric.description_th,
  lengthYardPerKg: fabric.lengthYardPerKg,
  lengthPerKg: fabric.lengthPerKg,
  type: fabric.type,
  price: fabric.price,
  color: fabric.color,
  color_th: fabric.color_th,
  colorValue: fabric.colorValue,
  gsm: fabric.gsm,
  width: fabric.width,
  usage: fabric.usage,
  stockStatus: fabric.stockStatus,
})
