import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'
import { api } from './api'
import { formatPrice } from './format'

/** สร้างและดาวน์โหลด Fabric Spec Card เป็น PDF พร้อม QR ลิงก์สินค้า */
export async function exportFabricSpecPdf(fabric) {
  const spec = await api.spec(fabric.id).catch(() => null)
  const url = spec?.qr_payload
    ? `${window.location.origin}${spec.qr_payload}`
    : `${window.location.origin}${window.location.pathname}#fabric/${fabric.id}`
  const qr = await QRCode.toDataURL(url, { margin: 1, width: 140 })
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('TEE CULTURE FABRIC SPEC', 16, 20)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Product Code: ${fabric.code}`, 16, 36)
  doc.text(`Product Name: ${fabric.name}`, 16, 45)
  doc.text(`Composition: ${fabric.composition}`, 16, 54)
  doc.text(`GSM: ${fabric.gsm}`, 16, 63)
  doc.text(`Width: ${fabric.width} inch`, 16, 72)
  doc.text(`Available Color: ${fabric.color}`, 16, 81)
  doc.text(`Stock Status: ${fabric.stockStatus}`, 16, 90)
  doc.text(`Current Price: ${formatPrice(fabric.price)} / kg`, 16, 99)
  doc.text('Product Highlight:', 16, 114)
  fabric.highlights.forEach((highlight, index) => doc.text(`- ${highlight}`, 20, 123 + index * 9))
  doc.addImage(qr, 'PNG', 150, 32, 38, 38)
  doc.save(`${fabric.code}-spec.pdf`)
}
