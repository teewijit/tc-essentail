export const productMedia = {
  'tc-2401': {
    image: 'https://source.unsplash.com/1000x800/?blue,jersey,fabric,texture',
    gallery: [
      'https://source.unsplash.com/400x400/?blue,cotton,fabric',
      'https://source.unsplash.com/400x400/?beige,fabric,texture',
      'https://source.unsplash.com/400x400/?blue,textile,cloth',
      'https://source.unsplash.com/400x400/?white,jersey,fabric',
      'https://source.unsplash.com/400x400/?black,cotton,fabric',
    ],
  },
  'ct-1180': {
    image: 'https://source.unsplash.com/1000x800/?black,cotton,fabric,texture',
    gallery: [
      'https://source.unsplash.com/400x400/?black,jersey,fabric',
      'https://source.unsplash.com/400x400/?gray,fabric,texture',
      'https://source.unsplash.com/400x400/?white,cotton,fabric',
      'https://source.unsplash.com/400x400/?navy,textile',
      'https://source.unsplash.com/400x400/?pink,fabric',
    ],
  },
  'cvc-5502': {
    image: 'https://source.unsplash.com/1000x800/?navy,pique,fabric,texture',
    gallery: [
      'https://source.unsplash.com/400x400/?navy,fabric',
      'https://source.unsplash.com/400x400/?green,fabric',
      'https://source.unsplash.com/400x400/?gray,fabric',
      'https://source.unsplash.com/400x400/?white,fabric',
      'https://source.unsplash.com/400x400/?black,fabric',
    ],
  },
}

export function getProductMedia(fabric) {
  return productMedia[fabric.id] || {
    image: `https://source.unsplash.com/1000x800/?${encodeURIComponent(fabric.color)},fabric,texture`,
    gallery: [
      `https://source.unsplash.com/400x400/?${encodeURIComponent(fabric.color)},fabric`,
      'https://source.unsplash.com/400x400/?cotton,fabric',
      'https://source.unsplash.com/400x400/?jersey,fabric',
      'https://source.unsplash.com/400x400/?textile,cloth',
      'https://source.unsplash.com/400x400/?black,fabric',
    ],
  }
}
