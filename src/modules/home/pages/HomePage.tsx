import HeroSection from '../components/HeroSection';
import { HeroAboutSection } from '../components/HeroAboutSection';
import { CategorySection } from '../components/CategorySection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroAboutSection />
      <CategorySection />
    </>
  );
}
