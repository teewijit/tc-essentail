import { fabrics } from '../data/fabrics'
import { HomeHero } from '../components/home/HomeHero'
import { HomePromotionSection } from '../components/home/HomePromotionSection'
import { HomeSearchPanel } from '../components/home/HomeSearchPanel'

export function HomePage({ homeData, catalogItems, query, setQuery, openCatalog, openDetail }) {
  return (
    <main>
      <HomeHero openCatalog={openCatalog} />
      <HomeSearchPanel query={query} setQuery={setQuery} openCatalog={openCatalog} />
      {/* <HomeImageSearchPanel query={query} setQuery={setQuery} openCatalog={openCatalog} /> */}
      <HomePromotionSection
        promotions={homeData?.promotions}
        catalogItems={catalogItems}
        fallbackFabrics={fabrics}
        onOpen={openDetail}
      />
      {/* <HowToOrderSection /> */}
    </main>
  )
}
