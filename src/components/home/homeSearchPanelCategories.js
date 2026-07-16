export const defaultCategoryTypes = [
  { id: 'tshirt', labelKey: 'filters.categories.tshirt', icon: 'shirt', filter: { category: 'T-Shirt' } },
  { id: 'polo', labelKey: 'filters.categories.polo', icon: 'shirt', filter: { category: 'Polo' } },
  { id: 'hoode', labelKey: 'filters.categories.hoode', icon: 'sparkle', filter: { category: 'Hoode' } },
  { id: 'crop', labelKey: 'filters.categories.crop', icon: 'sparkle', filter: { category: 'Crop' } },
  { id: 'tank', labelKey: 'filters.categories.tank', icon: 'shirt', filter: { category: 'Tank' } },
  { id: 'blazer', labelKey: 'filters.categories.blazer', icon: 'package', filter: { category: 'Blazer' } },
  { id: 'shirt', labelKey: 'filters.categories.shirt', icon: 'shirt', filter: { category: 'Shirt' } },
  { id: 'pants', labelKey: 'filters.categories.pants', icon: 'grid', filter: { category: 'Pants' } },
  { id: 'shorts', labelKey: 'filters.categories.shorts', icon: 'grid', filter: { category: 'Shorts' } },
  { id: 'dress', labelKey: 'filters.categories.dress', icon: 'sparkle', filter: { category: 'Dress' } },
  { id: 'skirt', labelKey: 'filters.categories.skirt', icon: 'sparkle', filter: { category: 'Skirt' } },
]

const categoryImageMap = {
  tshirt: {
    src: 'https://images.pexels.com/photos/28758240/pexels-photo-28758240.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing an oversized t-shirt',
  },
  polo: {
    src: 'https://images.pexels.com/photos/16048133/pexels-photo-16048133.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a polo shirt',
  },
  hoode: {
    src: 'https://images.pexels.com/photos/30410057/pexels-photo-30410057.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Models wearing hoodies',
  },
  crop: {
    src: 'https://images.pexels.com/photos/23179443/pexels-photo-23179443.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a crop top',
  },
  tank: {
    src: 'https://images.pexels.com/photos/26274788/pexels-photo-26274788.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a tank top',
  },
  blazer: {
    src: 'https://images.pexels.com/photos/7393489/pexels-photo-7393489.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a blazer',
  },
  shirt: {
    src: 'https://images.pexels.com/photos/7393489/pexels-photo-7393489.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a button-up shirt',
  },
  pants: {
    src: 'https://images.pexels.com/photos/10613160/pexels-photo-10613160.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model posing in statement pants',
  },
  shorts: {
    src: 'https://images.pexels.com/photos/10613160/pexels-photo-10613160.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing shorts',
  },
  dress: {
    src: 'https://images.pexels.com/photos/19908475/pexels-photo-19908475.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a dress',
  },
  skirt: {
    src: 'https://images.pexels.com/photos/19908475/pexels-photo-19908475.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Model wearing a skirt',
  },
}

export function getCategoryName(category, t) {
  return t(category.labelKey)
}

export function getCategoryImage(category) {
  return categoryImageMap[category.id] ?? categoryImageMap.tshirt
}
