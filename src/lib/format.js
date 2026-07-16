export const formatPrice = (value) =>
  new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: 0,
  }).format(value)

