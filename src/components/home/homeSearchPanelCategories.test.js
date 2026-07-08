import assert from 'node:assert/strict'
import { test } from 'node:test'

import { defaultCategoryTypes, getCategoryImage, getCategoryName } from './homeSearchPanelCategories.js'

test('uses Thai category name by default', () => {
  assert.equal(getCategoryName({ name: 'เดรส', name_en: 'Dress' }, 'th'), 'เดรส')
})

test('uses English category name when language is English', () => {
  assert.equal(getCategoryName({ name: 'เดรส', name_en: 'Dress' }, 'en'), 'Dress')
})

test('falls back to Thai category name when English name is missing', () => {
  assert.equal(getCategoryName({ name: 'เดรส' }, 'en'), 'เดรส')
})

test('uses apparel categories for the home category panels', () => {
  assert.deepEqual(
    defaultCategoryTypes.map((category) => category.name_en),
    ['Dress', 'Jacket/Hoody', 'Pants', 'Polo', 'Streetwear', 'T-Shirt', 'Underwear', 'Crop/Baby-Tee', 'Shirt', 'Accessory'],
  )
})

test('provides mock image metadata for every default category', () => {
  for (const category of defaultCategoryTypes) {
    const image = getCategoryImage(category)

    assert.equal(typeof image.src, 'string')
    assert.match(image.src, /^https:\/\/images\.pexels\.com\/photos\//)
    assert.equal(typeof image.alt, 'string')
    assert.ok(image.alt.length > 0)
  }
})
