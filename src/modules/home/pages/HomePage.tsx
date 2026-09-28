import HeroSection from '../components/HeroSection';
import { HeroAboutSection } from '../components/HeroAboutSection';
import { CategorySection } from '../components/CategorySection';
import { FeatureSection } from '../components/FeatureSection';
import { MarketInsightsSection } from '../components/MarketInsightsSection';
import { AppPromoSection } from '../components/AppPromoSection';
import { FaqSection } from '../components/FaqSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
      <FeatureSection />
      <MarketInsightsSection />
      <AppPromoSection />
      <FaqSection />
    </>
  );
}
