import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getStockSummary } from './detailPricingDisplay.js'

test('getStockSummary rounds stock quantity down to the nearest 50kg', () => {
  assert.equal(getStockSummary({ stockKg: 270, foldCount: 10 }, 'en'), '~250 Kg | 10 Row')
  assert.equal(getStockSummary({ stockKg: 290, foldCount: 10 }, 'en'), '~250 Kg | 10 Row')
  assert.equal(getStockSummary({ stockKg: 310, foldCount: 10 }, 'en'), '~300 Kg | 10 Row')
  assert.equal(getStockSummary({ stockKg: 120, foldCount: 6 }, 'en'), '~100 Kg | 6 Row')
})

test('getStockSummary uses Thai units by default', () => {
  assert.equal(getStockSummary({ stockKg: 270, foldCount: 10 }), '~250 กิโลกรัม | 10 พับ')
})

test('getStockSummary falls back to the requested default stock summary', () => {
  assert.equal(getStockSummary({}), '~200 กิโลกรัม | 10 พับ')
})
