import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { colors } from '../../data/fabrics'
import { Badge } from '../ui/badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/card'
import { FabricSwatch } from '../product/FabricSwatch'

export function DetailGallery({ fabric, activeColor, setActiveColor }) {
  const [lens, setLens] = useState({ active: false, x: 50, y: 50 })

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
    <div className="grid gap-3 sm:grid-cols-[82px_minmax(0,1fr)]">
      <div className="order-2 flex items-center justify-center gap-2 sm:order-1 sm:flex-col">
        <Button
          variant="outline"
          size="icon-lg"
          className="size-10 shrink-0 rounded-lg bg-white hover:bg-primary/10"
          aria-label="Previous shade"
          onClick={() => step(-1)}
        >
          <ChevronUp className="hidden size-5 sm:block" aria-hidden="true" />
          <ChevronUp className="size-5 rotate-[-90deg] sm:hidden" aria-hidden="true" />
        </Button>

        <div className="flex max-w-full gap-2 overflow-x-auto py-1 sm:max-h-[440px] sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:px-1">
          {swatchColors.map((color, index) => (
            <button
              key={color}
              type="button"
              onClick={() => setActiveColor(color)}
              className={`size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-0.5 shadow-sm transition-colors sm:size-[72px] ${
                color === activeColor
                  ? 'border-black ring-2 ring-white outline outline-1 outline-black'
                  : 'border-transparent hover:border-primary/60'
              }`}
              aria-label={`Shade ${index + 1}`}
              aria-pressed={color === activeColor}
            >
              <FabricSwatch fabric={{ ...fabric, colorValue: color }} className="h-full w-full rounded-md" />
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon-lg"
          className="size-10 shrink-0 rounded-lg bg-white hover:bg-primary/10"
          aria-label="Next shade"
          onClick={() => step(1)}
        >
          <ChevronDown className="hidden size-5 sm:block" aria-hidden="true" />
          <ChevronDown className="size-5 rotate-[-90deg] sm:hidden" aria-hidden="true" />
        </Button>
      </div>

      <Card
        className="order-1 relative h-[clamp(520px,42vw,680px)] cursor-crosshair overflow-hidden rounded-xl p-0 shadow-sm sm:order-2"
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
        <FabricSwatch fabric={{ ...fabric, colorValue: activeColor }} className="absolute inset-0 h-full w-full" />
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
    </div>
  )
}
