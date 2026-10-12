import HeroSection from "../components/HeroSection";
import { HeroAboutSection } from "../components/HeroAboutSection";
import { CategorySection } from "../components/CategorySection";
import { FeatureSection } from "../components/FeatureSection";
import { MarketPlanSection } from "../components/MarketPlanSection";
import { AppPromoSection } from "../components/AppPromoSection";
import ContactSection from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
      <FeatureSection />
      {/* Blogs hidden — FeaturedBlogsSection + FrontBlogsSection removed from home. */}
      {/* All-commodity market plan (live-site copy). */}
      <MarketPlanSection />
      <AppPromoSection />
      {/* FAQ now renders globally via MainLayout (dynamic API + home fallback). */}
      <ContactSection />
    </>
  );
}
