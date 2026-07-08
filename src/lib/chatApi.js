// Mock-only client for deployable frontend previews.
// No network or database connection is used in mockup mode.
export const CHAT_API_URL = 'mock://tee-culture'
export const isChatConfigured = true

export class ChatApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ChatApiError'
    this.status = status
  }
}

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

const mockLinks = [
  { label: 'Shop Fabric', href: '#/fabric' },
  { label: 'Contact TEE CULTURE', href: '#/contact' },
]

const answerQuestion = (question) => {
  const text = question.toLowerCase()

  if (text.includes('ราคา') || text.includes('price') || text.includes('เท่าไหร่')) {
    return 'ราคา mockup เริ่มต้นประมาณ 150-230 บาท / KG แล้วแต่ชนิดผ้า สี และสต็อกค่ะ สามารถดูราคาตัวอย่างได้จากการ์ดสินค้าในหน้า Fabric'
  }

  if (text.includes('cotton') || text.includes('คอตตอน')) {
    return 'ผ้า Cotton mockup ที่แนะนำตอนนี้มี Cotton Touch, Cotton Combed และ Cotton Soft Jersey เหมาะกับเสื้อยืด งานพิมพ์ และงานใส่สบายค่ะ'
  }

  if (text.includes('สต็อก') || text.includes('stock')) {
    return 'ข้อมูลสต็อกใน mockup เป็นข้อมูลจำลอง ทีมงานจะยืนยันจำนวนจริงอีกครั้งก่อนชำระเงินหรือจัดส่งค่ะ'
  }

  return 'ตอนนี้ Essie AI อยู่ในโหมด mockup ค่ะ ถามเรื่องชนิดผ้า ราคา สี หรือการใช้งานได้เลย ระบบจะตอบจากข้อมูลจำลองสำหรับเดโมก่อน'
}

export async function loginWithGoogle() {
  await wait()
  return {
    access_token: 'mock-google-token',
    token_type: 'bearer',
  }
}

export async function loginWithMock(email = 'demo@gmail.com', name = 'Demo User') {
  await wait()
  return {
    access_token: `mock-token-${email}-${name}`.replace(/\s+/g, '-').toLowerCase(),
    token_type: 'bearer',
  }
}

export async function sendChatMessage({ question }) {
  await wait(450)
  return {
    answer: answerQuestion(question),
    links: mockLinks,
  }
}
