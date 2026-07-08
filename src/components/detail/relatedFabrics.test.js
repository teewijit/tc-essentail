import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getSameTypeFabrics, getSimilarFabrics } from './relatedFabrics.js'

const current = {
  id: 'tc-current',
  type: 'TC',
  usage: 'T-Shirt',
  gsm: 180,
}

const allFabrics = [
  current,
  { id: 'tc-same-type', type: 'TC', usage: 'Uniform', gsm: 220 },
  { id: 'cotton-same-usage', type: 'Cotton', usage: 'T-Shirt', gsm: 190 },
  { id: 'cvc-close-gsm', type: 'CVC', usage: 'Polo', gsm: 175 },
  { id: 'poly-distant', type: 'Polyester', usage: 'Uniform', gsm: 260 },
]

test('getSameTypeFabrics returns fabrics in the same group including the current fabric', () => {
  assert.deepEqual(
    getSameTypeFabrics(current, { fabrics: allFabrics }).map((item) => item.id),
    ['tc-current', 'tc-same-type'],
  )
})

test('getSimilarFabrics returns similar products outside the same group', () => {
  assert.deepEqual(
    getSimilarFabrics(current, { fabrics: allFabrics }).map((item) => item.id),
    ['cotton-same-usage', 'cvc-close-gsm', 'poly-distant'],
  )
})
