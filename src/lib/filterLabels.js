export const filterOptionGroups = {
  category: [
    { key: 'tshirt', value: 'T-Shirt', labelKey: 'filters.categories.tshirt' },
    { key: 'polo', value: 'Polo', labelKey: 'filters.categories.polo' },
    { key: 'hoode', value: 'Hoode', labelKey: 'filters.categories.hoode' },
    { key: 'crop', value: 'Crop', labelKey: 'filters.categories.crop' },
    { key: 'tank', value: 'Tank', labelKey: 'filters.categories.tank' },
    { key: 'blazer', value: 'Blazer', labelKey: 'filters.categories.blazer' },
    { key: 'shirt', value: 'Shirt', labelKey: 'filters.categories.shirt' },
    { key: 'pants', value: 'Pants', labelKey: 'filters.categories.pants' },
    { key: 'shorts', value: 'Shorts', labelKey: 'filters.categories.shorts' },
    { key: 'dress', value: 'Dress', labelKey: 'filters.categories.dress' },
    { key: 'skirt', value: 'Skirt', labelKey: 'filters.categories.skirt' },
  ],
  fabric_type: [
    { key: 'singleJersey', value: 'single_jersey', labelKey: 'filters.fabricTypes.single_jersey' },
    { key: 'interlock', value: 'interlock', labelKey: 'filters.fabricTypes.interlock' },
    { key: 'rib', value: 'rib', labelKey: 'filters.fabricTypes.rib' },
    { key: 'frenchTerry', value: 'french_terry', labelKey: 'filters.fabricTypes.french_terry' },
    { key: 'pique', value: 'pique', labelKey: 'filters.fabricTypes.pique' },
  ],
  composition: [
    { key: 'cotton100', value: '100% Cotton', labelKey: 'filters.compositions.cotton100' },
    { key: 'cottonPolyester', value: 'Cotton Polyester', labelKey: 'filters.compositions.cottonPolyester' },
    { key: 'polyester100', value: '100% Polyester', labelKey: 'filters.compositions.polyester100' },
    { key: 'cottonSpandex', value: 'Cotton Spandex', labelKey: 'filters.compositions.cottonSpandex' },
    { key: 'polyesterSpandex', value: 'Polyester Spandex', labelKey: 'filters.compositions.polyesterSpandex' },
  ],
  stockStatus: [
    { key: 'inStock', value: 'In Stock', labelKey: 'filters.stockOptions.inStock' },
    { key: 'lowStock', value: 'Low Stock', labelKey: 'filters.stockOptions.lowStock' },
    { key: 'preOrder', value: 'Pre-Order', labelKey: 'filters.stockOptions.preOrder' },
  ],
  color: [
    { key: 'white', value: 'White', labelKey: 'filters.colors.white' },
    { key: 'beigeBrown', value: 'Beige / Brown', labelKey: 'filters.colors.beigeBrown' },
    { key: 'yellowOrange', value: 'Yellow / Orange', labelKey: 'filters.colors.yellowOrange' },
    { key: 'orange', value: 'Orange', labelKey: 'filters.colors.orange' },
    { key: 'pink', value: 'Pink', labelKey: 'filters.colors.pink' },
    { key: 'red', value: 'Red', labelKey: 'filters.colors.red' },
    { key: 'purple', value: 'Purple', labelKey: 'filters.colors.purple' },
    { key: 'blue', value: 'Blue', labelKey: 'filters.colors.blue' },
    { key: 'teal', value: 'Teal', labelKey: 'filters.colors.teal' },
    { key: 'green', value: 'Green', labelKey: 'filters.colors.green' },
    { key: 'grey', value: 'Grey', labelKey: 'filters.colors.grey' },
    { key: 'black', value: 'Black', labelKey: 'filters.colors.black' },
  ],
}

export function getFilterLabel(filterKey, value, t) {
  const values = String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return values
    .map((item) => {
      const option = filterOptionGroups[filterKey]?.find((entry) => entry.value === item)
      return option ? t(option.labelKey) : item
    })
    .join(', ')
}
