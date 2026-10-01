import HeroSection from "../components/HeroSection";
import { HeroAboutSection } from "../components/HeroAboutSection";
import { CategorySection } from "../components/CategorySection";
import { FeatureSection } from "../components/FeatureSection";
import { MarketInsightsSection } from "../components/MarketInsightsSection";
import { AppPromoSection } from "../components/AppPromoSection";
import ContactSection from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
      <FeatureSection />
      <MarketInsightsSection />
      <AppPromoSection />
      {/* FAQ now renders globally via MainLayout (dynamic API + home fallback). */}
      <ContactSection />
    </>
  );
}
