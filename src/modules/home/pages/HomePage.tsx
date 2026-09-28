import HeroSection from '../components/HeroSection';
import { HeroAboutSection } from '../components/HeroAboutSection';
import { CategorySection } from '../components/CategorySection';
import { FeatureSection } from '../components/FeatureSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
      <FeatureSection />
    </>
  );
}
