import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'
import bannerPolo from '../../assets/banner/banner_polo.jpg'
import bannerPromo from '../../assets/banner/banner_promo.jpg'
import bannerTshirt from '../../assets/banner/banner_t-shirt.jpg'

const heroSlides = [
  {
    id: 'banner-promo',
    image: bannerPromo,
    alt: 'Tee Culture promotional fabric banner',
    filter: { fabric_type: 'single_jersey,french_terry' },
    meta: { fabric_type: ['single_jersey', 'french_terry'] },
  },
  {
    id: 'banner-polo',
    image: bannerPolo,
    alt: 'Polo fabric category banner',
    filter: { category: 'Polo' },
    meta: { category: 'polo' },
  },
  {
    id: 'banner-t-shirt',
    image: bannerTshirt,
    alt: 'T-shirt fabric category banner',
    filter: { category: 'T-Shirt' },
    meta: { category: 't-shirt' },
  },
]

export function HomeHero({ openCatalog }) {
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

  const handleSlideClick = (event, filter) => {
    if (!openCatalog) return
    event.preventDefault()
    openCatalog(filter)
  }

  return (
    <section className="relative h-[clamp(540px,48vw,680px)] overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="absolute inset-0 h-full w-full [&>div]:h-full [&>div>div]:h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full basis-full pl-0">
              <a
                href={`#/catalog?${new URLSearchParams(slide.filter).toString()}`}
                aria-label={`Open ${slide.alt}`}
                data-banner-category={slide.meta.category}
                data-banner-fabric-type={slide.meta.fabric_type?.join(',')}
                onClick={(event) => handleSlideClick(event, slide.filter)}
                className="flex h-full w-full items-center justify-center"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-auto max-w-none object-contain shadow-[0_4px_18px_rgba(0,0,0,0.08)]"
                />
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
