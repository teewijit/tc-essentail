import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'

const heroSlides = [
  {
    id: 'tc-2401',
    image: '/hero/hero-1.jpg',
    alt: 'TC Smooth Knit fabric highlight',
    targetHref: '#fabric/tc-2401',
  },
  {
    id: 'ct-1180',
    image: '/hero/hero-2.jpg',
    alt: 'Cotton Comfort 20s fabric highlight',
    targetHref: '#fabric/ct-1180',
  },
  {
    id: 'cvc-5502',
    image: '/hero/hero-3.jpg',
    alt: 'CVC Performance Pique fabric highlight',
    targetHref: '#fabric/cvc-5502',
  },
]

export function HomeHero() {
  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return undefined

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)

    return () => api.off('select', onSelect)
  }, [api])

  useEffect(() => {
    if (!api) return undefined

    const timer = window.setInterval(() => {
      api.scrollNext()
    }, 8000)

    return () => window.clearInterval(timer)
  }, [api])

  const handleSlideClick = (targetHref) => {
    if (window.location.hash === targetHref) {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
  }

  return (
    <section className="relative min-h-[620px] overflow-hidden md:min-h-[500px]">
      <Carousel setApi={setApi} opts={{ loop: true }} className="absolute inset-0 h-full w-full">
        <CarouselContent className="ml-0 h-full">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full basis-full pl-0">
              <a
                href={slide.targetHref}
                aria-label={`Open ${slide.alt}`}
                onClick={() => handleSlideClick(slide.targetHref)}
                className="block h-full w-full"
              >
                <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="absolute left-3 top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-white/70 bg-black/65 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md hover:scale-105 hover:bg-black/80 hover:text-white focus-visible:ring-white/70 md:left-8 md:size-13"
        aria-label="Previous hero"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="absolute right-3 top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-white/70 bg-black/65 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md hover:scale-105 hover:bg-black/80 hover:text-white focus-visible:ring-white/70 md:right-8 md:size-13"
        aria-label="Next hero"
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight size={28} strokeWidth={2.5} aria-hidden="true" />
      </Button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, index) => (
          <Button
            key={slide.id}
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Hero slide ${index + 1}`}
            aria-current={current === index ? 'true' : undefined}
            onClick={() => api?.scrollTo(index)}
            className="size-2 rounded-full border-0 p-0 shadow-none hover:bg-[#061b3a]"
          >
            <span className={`block size-2 rounded-full ${current === index ? 'bg-[#061b3a]' : 'bg-zinc-300'}`} />
          </Button>
        ))}
      </div>
    </section>
  )
}
