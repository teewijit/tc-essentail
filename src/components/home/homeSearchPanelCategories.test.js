import assert from 'node:assert/strict'
import { test } from 'node:test'

import { translate } from '../../i18n/translations.js'
import { defaultCategoryTypes, getCategoryImage, getCategoryName } from './homeSearchPanelCategories.js'

test('uses Thai category name from i18n', () => {
  assert.equal(getCategoryName({ labelKey: 'filters.categories.dress' }, (key) => translate('th', key)), 'เดรส')
})

test('uses English category name from i18n', () => {
  assert.equal(getCategoryName({ labelKey: 'filters.categories.dress' }, (key) => translate('en', key)), 'Dress')
})

test('keeps category labels in i18n', () => {
  for (const category of defaultCategoryTypes) {
    assert.notEqual(translate('th', category.labelKey), category.labelKey)
    assert.notEqual(translate('en', category.labelKey), category.labelKey)
  }
})

test('uses apparel categories for the home category panels', () => {
  assert.deepEqual(
    defaultCategoryTypes.map((category) => translate('en', category.labelKey)),
    ['T-Shirt', 'Polo', 'Hoode', 'Crop', 'Tank', 'Blazer', 'Shirt', 'Pants', 'Shorts', 'Dress', 'Skirt'],
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
