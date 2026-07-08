export const defaultCategoryTypes = [
  { id: 'dress', name: 'Dress', name_en: 'Dress', icon: 'sparkle', filter: { category: 'Dress' } },
  { id: 'jacket-hoody', name: 'Jacket/Hoody', name_en: 'Jacket/Hoody', icon: 'shirt', filter: { category: 'Jacket/Hoody' } },
  { id: 'pants', name: 'Pants', name_en: 'Pants', icon: 'grid', filter: { category: 'Pants' } },
  { id: 'polo', name: 'Polo', name_en: 'Polo', icon: 'shirt', filter: { category: 'Polo' } },
  { id: 'streetwear', name: 'Streetwear', name_en: 'Streetwear', icon: 'sport', filter: { category: 'Streetwear' } },
  { id: 'tshirt', name: 'T-Shirt', name_en: 'T-Shirt', icon: 'shirt', filter: { category: 'T-Shirt' } },
  { id: 'underwear', name: 'Underwear', name_en: 'Underwear', icon: 'package', filter: { category: 'Underwear' } },
  { id: 'crop-baby-tee', name: 'Crop/Baby-Tee', name_en: 'Crop/Baby-Tee', icon: 'baby', filter: { category: 'Crop/Baby-Tee' } },
  { id: 'shirt', name: 'Shirt', name_en: 'Shirt', icon: 'shirt', filter: { category: 'Shirt' } },
  { id: 'accessory', name: 'Accessory', name_en: 'Accessory', icon: 'trophy', filter: { category: 'Accessory' } },
]

const categoryImageMap = {
  accessory: {
    src: 'https://images.pexels.com/photos/3892369/pexels-photo-3892369.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fashion accessories arranged as a flat lay',
  },
  'crop-baby-tee': {
    src: 'https://images.pexels.com/photos/23179443/pexels-photo-23179443.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a crop top',
  },
  dress: {
    src: 'https://images.pexels.com/photos/19908475/pexels-photo-19908475.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a satin dress',
  },
  'jacket-hoody': {
    src: 'https://images.pexels.com/photos/30410057/pexels-photo-30410057.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Models wearing hoodies',
  },
  pants: {
    src: 'https://images.pexels.com/photos/10613160/pexels-photo-10613160.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model posing in statement pants',
  },
  polo: {
    src: 'https://images.pexels.com/photos/16048133/pexels-photo-16048133.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a polo shirt',
  },
  shirt: {
    src: 'https://images.pexels.com/photos/7393489/pexels-photo-7393489.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a button-up shirt',
  },
  streetwear: {
    src: 'https://images.pexels.com/photos/36824241/pexels-photo-36824241.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Streetwear model in an oversized jacket',
  },
  tshirt: {
    src: 'https://images.pexels.com/photos/28758240/pexels-photo-28758240.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing an oversized t-shirt',
  },
  underwear: {
    src: 'https://images.pexels.com/photos/26274788/pexels-photo-26274788.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing underwear in a studio setting',
  },
}

export function getCategoryName(category, language) {
  if (language === 'en' && category.name_en) return category.name_en
  return category.name
}

export function getCategoryImage(category) {
  return categoryImageMap[category.id] ?? categoryImageMap.tshirt
}
