import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { colors } from '../../data/fabrics'
import { Badge } from '../ui/badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/card'
import { FabricSwatch } from '../product/FabricSwatch'

/** แกลเลอรีสินค้า — ภาพหลัก + thumbnail เฉดสี เลื่อนซ้าย/ขวาได้ */
export function DetailGallery({ fabric, activeColor, setActiveColor }) {
  const [lens, setLens] = useState({ active: false, x: 50, y: 50 })

  // เฉดสีตัวอย่าง: สีจริงของผ้าก่อน ตามด้วยสีมาตรฐานของร้าน
  const swatchColors = [
    fabric.colorValue,
    ...colors.map((color) => color.value).filter((value) => value !== fabric.colorValue),
  ].slice(0, 5)

  const activeIndex = Math.max(0, swatchColors.indexOf(activeColor))
  const step = (offset) => {
    const next = (activeIndex + offset + swatchColors.length) % swatchColors.length
    setActiveColor(swatchColors[next])
  }

  const moveLens = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100))
    const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100))
    setLens({ active: true, x, y })
  }

  return (
    <div>
      <Card
        className="relative cursor-crosshair overflow-hidden rounded-xl p-0 shadow-sm"
        onPointerEnter={moveLens}
        onPointerMove={moveLens}
        onPointerLeave={() => setLens((current) => ({ ...current, active: false }))}
      >
        {fabric.isPopular && (
          <Badge className="absolute left-4 top-4 z-10 gap-1 bg-primary text-xs text-primary-foreground">
            BEST SELLER
          </Badge>
        )}
        {fabric.isNew && !fabric.isPopular && (
          <Badge className="absolute left-4 top-4 z-10 bg-[#061b3a] text-xs text-white">NEW</Badge>
        )}
        <FabricSwatch fabric={{ ...fabric, colorValue: activeColor }} className="h-[clamp(520px,42vw,680px)] w-full" />
        <div
          className={`fabric-zoom-lens pointer-events-none absolute z-20 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/90 shadow-[0_14px_34px_rgba(0,0,0,0.24)] ring-1 ring-black/15 transition-opacity duration-150 ${
            lens.active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            '--swatch': activeColor,
            '--swatch-soft': `${activeColor}33`,
            left: `${lens.x}%`,
            top: `${lens.y}%`,
            backgroundPosition: `${lens.x}% ${lens.y}%`,
            backgroundSize: '240% 240%',
          }}
          aria-hidden="true"
        />
      </Card>

      <div className="mt-3 flex items-center justify-center gap-3">
        <Button variant="outline" size="icon-lg" className="size-10 rounded-full hover:bg-primary/10" aria-label="เฉดสีก่อนหน้า" onClick={() => step(-1)}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </Button>
        {swatchColors.map((color, index) => (
          <button
            key={color}
            type="button"
            onClick={() => setActiveColor(color)}
            className={`h-16 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
              color === activeColor ? 'border-primary' : 'border-transparent hover:border-primary/40'
            }`}
            aria-label={`เฉดสีที่ ${index + 1}`}
            aria-pressed={color === activeColor}
          >
            <FabricSwatch fabric={{ ...fabric, colorValue: color }} className="h-full w-full" />
          </button>
        ))}
        <Button variant="outline" size="icon-lg" className="size-10 rounded-full hover:bg-primary/10" aria-label="เฉดสีถัดไป" onClick={() => step(1)}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
