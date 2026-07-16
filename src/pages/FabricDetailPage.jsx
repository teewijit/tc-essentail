import { useState } from "react";
import { ChevronRight, ShoppingBag, ShoppingCart } from "lucide-react";
import { DetailGallery } from "../components/detail/DetailGallery";
import { DetailSidePanels } from "../components/detail/DetailSidePanels";
import { DetailSpecTable } from "../components/detail/DetailSpecTable";
import { DetailSummary } from "../components/detail/DetailSummary";
import { SameTypeSection } from "../components/detail/SameTypeSection";
import { SimilarProductsSection } from "../components/detail/SimilarProductsSection";
import { getStockSummary } from "../components/detail/detailPricingDisplay";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../i18n/useLanguage";
import { useCartStore } from "../store/useCartStore";
import { useBookmarksStore, useFavoritesStore } from "../store/useCollections";

export function FabricDetailPage({ fabric, goBack, openDetail, goCart }) {
  const { language, t } = useLanguage();
  const [actionMessage, setActionMessage] = useState("");
  const [activeColor, setActiveColor] = useState(fabric.colorValue);

  const saved = useFavoritesStore((state) =>
    state.items.some((item) => item.id === fabric.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggle);
  const bookmarked = useBookmarksStore((state) =>
    state.items.some((item) => item.id === fabric.id),
  );
  const toggleBookmark = useBookmarksStore((state) => state.toggle);
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addToCart(fabric, 1);
    setActionMessage(t("detail.addedToCart", { code: fabric.code }));
  };

  const handleBuyNow = () => {
    addToCart(fabric, 1);
    goCart();
  };

  const handleFavorite = () => {
    const added = toggleFavorite(fabric);
    setActionMessage(
      added ? t("detail.favoriteAdded") : t("detail.favoriteRemoved"),
    );
  };

  const handleBookmark = () => {
    const added = toggleBookmark(fabric);
    setActionMessage(
      added ? t("detail.bookmarkAdded") : t("detail.bookmarkRemoved"),
    );
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#fabric/${fabric.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setActionMessage(t("detail.linkCopied"));
    } catch {
      setActionMessage(url);
    }
  };

  return (
    <main className="bg-[#fbfcff]">
      <section className="page-shell pt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-500">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            className="h-8 px-0 text-[#061b3a] hover:bg-transparent hover:text-primary"
          >
            {/* <ChevronLeft size={14} aria-hidden="true" /> */}
            {t("detail.breadcrumbCatalog")}
          </Button>
          <ChevronRight className="size-6" aria-hidden="true" />
          <span>{fabric.type}</span>
          <ChevronRight className="size-6" aria-hidden="true" />
          <strong className="text-[#061b3a]">{fabric.code}</strong>
        </div>
      </section>

      {/* detail gallery and summary */}
      <section className="page-shell grid gap-5 pb-5 pt-4 lg:grid-cols-[1fr_1fr]">
        <DetailGallery
          fabric={fabric}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />

        <div className="space-y-4">
          <DetailSummary
            fabric={fabric}
            saved={saved}
            bookmarked={bookmarked}
            onFavorite={handleFavorite}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
          <DetailSpecTable fabric={fabric} />

          <SameTypeSection fabric={fabric} onOpen={openDetail} />

          <div className="space-y-2 text-md">
            <div className="flex gap-3">
              <span className="text-zinc-500">{t("detail.stockStatus")}</span>
              <strong className="text-[#061b3a]">
                {getStockSummary(fabric, language)}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-base font-extrabold">
            <Button
              variant="outline"
              className="h-12 w-full max-w-[220px] rounded-xl border-2 border-[#061b3a] bg-white px-5 font-extrabold text-[#061b3a] shadow-sm hover:bg-[#061b3a] hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {t("actions.addToCart")}
            </Button>
            <Button
              className="h-12 w-full max-w-[220px] rounded-xl px-5"
              onClick={handleBuyNow}
            >
              <ShoppingCart className="size-5" aria-hidden="true" />
              {t("actions.buyNow")}
            </Button>
          </div>
          {actionMessage && (
            <p className="rounded-md bg-muted px-3 py-2 text-sm font-semibold text-zinc-700">
              {actionMessage}
            </p>
          )}
        </div>
      </section>

      <section className="page-shell pb-5">
        <DetailSidePanels fabric={fabric} activeColor={activeColor} />
      </section>

      <section className="page-shell pb-5">
        <SimilarProductsSection fabric={fabric} onOpen={openDetail} />
      </section>
    </main>
  );
}
