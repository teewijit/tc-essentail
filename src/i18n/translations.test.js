import assert from 'node:assert/strict'
import { test } from 'node:test'

import { translate } from './translations.js'

test('returns Thai copy by default key and language', () => {
  assert.equal(translate('th', 'nav.home'), 'หน้าแรก')
})

test('returns English copy for the same key', () => {
  assert.equal(translate('en', 'nav.home'), 'HOME')
})

test('interpolates params in translated messages', () => {
  assert.equal(translate('th', 'cart.itemCount', { count: 3 }), '3 รายการ')
  assert.equal(translate('en', 'cart.itemCount', { count: 3 }), '3 items')
})

test('returns detail related section titles from translations', () => {
  assert.equal(translate('th', 'detail.sameTypeTitle'), 'สินค้าในกลุ่มเดียวกัน')
  assert.equal(translate('en', 'detail.sameTypeTitle'), 'SAME FABRIC GROUP')
  assert.equal(translate('th', 'detail.relatedTitle'), 'สินค้าที่คล้ายกัน')
  assert.equal(translate('en', 'detail.relatedTitle'), 'SIMILAR PRODUCTS')
})

test('returns home category section title in both languages', () => {
  assert.equal(translate('th', 'home.categoryTitle'), 'หมวดหมู่')
  assert.equal(translate('en', 'home.categoryTitle'), 'Category')
})

test('returns cart checkout copy from the shared dictionaries', () => {
  assert.deepEqual(translate('th', 'cart.checkout.breadcrumb'), ['สินค้า', 'ตะกร้า', 'ชำระเงิน'])
  assert.deepEqual(translate('en', 'cart.checkout.breadcrumb'), ['Products', 'Cart', 'Checkout'])
  assert.equal(translate('th', 'cart.checkout.missingInfo'), 'กรุณากรอกชื่อ เบอร์โทร ที่อยู่ จังหวัด และรหัสไปรษณีย์ให้ครบก่อนยืนยัน')
  assert.equal(translate('en', 'cart.checkout.missingInfo'), 'Please fill in name, phone, address, province, and postcode before confirming.')
  assert.deepEqual(translate('th', 'cart.checkout.shippingMethods.delivery'), ['จัดส่งถึงที่', 'จัดส่งตามที่อยู่ที่เลือก'])
  assert.deepEqual(translate('en', 'cart.checkout.paymentMethods.cod'), ['Cash on delivery', 'Available in supported areas'])
})

test('falls back to the key when a translation is missing', () => {
  assert.equal(translate('th', 'missing.copy'), 'missing.copy')
})
