#!/usr/bin/env node
/**
 * Generate seed_items.json สำหรับ Essie AI Chatbot จาก src/data/fabrics.js
 * ใช้: node scripts/generate-seed.mjs [output-path]
 * default output: ../essie-ai-chatbot/backend/data/seed_items.json
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fabricTypes, fabrics } from '../src/data/fabrics.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const output = resolve(
  __dirname,
  process.argv[2] || '../../essie-ai-chatbot/backend/data/seed_items.json',
)

const STOCK_TH = {
  'Ready stock': 'มีสต็อกพร้อมส่ง (Ready stock)',
  'Limited stock': 'สต็อกจำนวนจำกัด (Limited stock)',
  'Pre-order': 'สั่งจองล่วงหน้า (Pre-order)',
}

const fabricItem = (f) => ({
  id: f.id,
  title: `${f.name} (${f.code})`,
  content:
    `ผ้า ${f.name} รหัส ${f.code} ประเภท ${f.type} ` +
    `ส่วนผสม ${f.composition} น้ำหนัก ${f.gsm} GSM หน้ากว้าง ${f.width} นิ้ว สี ${f.color} ` +
    `เหมาะสำหรับ ${f.usage} สถานะสต็อก: ${STOCK_TH[f.stockStatus] || f.stockStatus} ` +
    `จุดเด่น: ${f.highlights.join(', ')} ` +
    `รายละเอียด: ${f.description} ` +
    `ราคา ${f.price} บาทต่อกิโลกรัม`,
  metadata: {
    fabric_id: f.id,
    code: f.code,
    type: f.type,
    color: f.color,
    usage: f.usage,
    price: f.price,
    gsm: f.gsm,
    width: f.width,
    composition: f.composition,
    stock_status: f.stockStatus,
    link: `/#fabric/${f.id}`,
    category_link: `/#catalog?type=${f.type}`,
  },
})

const categoryItem = (type) => {
  const list = fabrics.filter((f) => f.type === type)
  const lines = list
    .map((f) => `- ${f.name} (${f.code}) สี ${f.color} ${f.gsm} GSM เหมาะกับ ${f.usage} ราคา ${f.price} บาท/กก.`)
    .join(' ')
  return {
    id: `category-${type.toLowerCase()}`,
    title: `หมวดผ้า ${type}`,
    content: `หมวดผ้าประเภท ${type} ของ TEE CULTURE มีทั้งหมด ${list.length} รายการ: ${lines}`,
    metadata: {
      type,
      category_link: `/#catalog?type=${type}`,
    },
  }
}

const overviewItem = () => {
  const lines = fabrics
    .map((f) => `${f.name} (${f.code}) ประเภท ${f.type} สี ${f.color} ราคา ${f.price} บาท/กก.`)
    .join(', ')
  return {
    id: 'overview-all-fabrics',
    title: 'สินค้าทั้งหมดของ TEE CULTURE',
    content:
      `TEE CULTURE จำหน่ายผ้าสำหรับผลิตเสื้อผ้า มีผ้าทั้งหมด ${fabrics.length} รายการ ` +
      `ครอบคลุมประเภท ${fabricTypes.join(', ')} ได้แก่: ${lines} ` +
      `ราคาเป็นราคาต่อกิโลกรัม สั่งซื้อหรือดูรายละเอียดเพิ่มเติมได้ที่หน้าแคตตาล็อก`,
    metadata: {
      category_link: '/#catalog',
    },
  }
}

const payload = {
  replace_all: false,
  items: [...fabrics.map(fabricItem), ...fabricTypes.map(categoryItem), overviewItem()],
}

mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`Generated ${payload.items.length} items -> ${output}`)
