import { fabrics as defaultFabrics } from '../../data/fabrics.js'

export function getSameTypeFabrics(fabric, { fabrics = defaultFabrics } = {}) {
  return fabrics.filter((item) => item.type === fabric.type)
}

export function getSimilarFabrics(fabric, { fabrics = defaultFabrics, limit = 4 } = {}) {
  return fabrics
    .filter((item) => item.id !== fabric.id && item.type !== fabric.type)
    .map((item, index) => ({
      item,
      index,
      score: getSimilarityScore(fabric, item),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ item }) => item)
}

function getSimilarityScore(source, candidate) {
  let score = 0

  if (candidate.usage === source.usage) {
    score += 2
  }

  if (Math.abs(candidate.gsm - source.gsm) <= 40) {
    score += 1
  }

  return score
}
