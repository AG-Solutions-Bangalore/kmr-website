import HeroSection from "../components/HeroSection";
import { HeroAboutSection } from "../components/HeroAboutSection";
import { CategorySection } from "../components/CategorySection";
import { FeatureSection } from "../components/FeatureSection";
import { MarketPlanSection } from "../components/MarketPlanSection";
import { FeaturedBlogsSection, FrontBlogsSection } from "@/modules/blog";
import { AppPromoSection } from "../components/AppPromoSection";
import ContactSection from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
      <FeatureSection />
      {/* Dynamic blogs — GET /getFeaturedBlogs + GET /getFrontBlogs. Each renders nothing when empty. */}
      <FeaturedBlogsSection />
      <FrontBlogsSection />
      {/* All-commodity market plan (live-site copy). */}
      <MarketPlanSection />
      <AppPromoSection />
      {/* FAQ now renders globally via MainLayout (dynamic API + home fallback). */}
      <ContactSection />
    </>
  );
}
