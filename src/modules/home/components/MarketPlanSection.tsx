import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home — "All Commodity Market Plan" strip.
 * Copy + rate list adapted from the live kmrlive.in landing page.
 * Layout follows the site's section system (container, eyebrow pill,
 * navy headings, mist cards) with matching scroll entrance.
 */

const MARKET_RATES = [
  "Edible Oil & Oil Seed Rates",
  "Coconut Oil, Copra, DC Powder & Coconuts Rates",
  "Pulses Rates",
  "GN Seed Rates",
  "Arecanut Rates",
  "Maize Rates",
  "Sugar Rates",
  "Rice & Paddy Rates",
  "Wheat Product Rates",
  "Spices Rates",
  "Dry Fruits Rates",
  "Kirana Rates",
  "Leading Brand Rates",
];

export function MarketPlanSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".market-plan-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        },
      );

      tl.fromTo(
        ".market-plan-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "expo.out",
        },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16"
    >
      <div className="container relative z-10 mx-auto max-w-[1300px] px-4 md:px-8">
        {/* Header row — same system as category/feature headers */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start">
            <div className="market-plan-element mb-3 flex items-center gap-2 rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
              Market Plan
            </div>
            <h2 className="market-plan-element mb-2 max-w-xl text-2xl font-extrabold tracking-tight text-navy-900 sm:mb-3 sm:text-3xl lg:text-[2.2rem] lg:leading-[1.15]">
              Let&apos;s Make Customers Focus on Your Brand
            </h2>
            <p className="market-plan-element max-w-2xl text-[13px] font-medium text-muted-500 sm:text-[14px]">
              Karnataka Market Reports covers all food-industry live rates,
              updates and news — present rates and future trends — and
              remains a favourite of readers across South India.
            </p>
          </div>

          {/* Stat chip */}
          <div className="market-plan-element  flex shrink-0 items-center bg-linear-to-r from-primary-600 to-primary-800 gap-3 rounded-2xl border border-mist-100 bg-mist-50 px-5 py-4">
            <span className="text-3xl font-extrabold tracking-tight text-mist-50 sm:text-8xl">
              75%
            </span>
            <span className="text-[13px] font-bold leading-snug text-mist-50">
              of happy users
              <span className="block text-[12px] font-medium text-mist-300">
                traders, farmers, retailers & wholesalers
              </span>
            </span>
          </div>
        </div>

        {/* Rate checklist */}
        <div className="mb-2 flex items-center gap-3">
          <h3 className="market-plan-element text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy-900">
            All Commodity Market Plan
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-mist-200" />
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {MARKET_RATES.map((rate) => (
            <span
              key={rate}
              className="market-plan-card inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white py-2.5 pl-3 pr-4 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_8px_22px_rgb(0,0,0,0.07)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 fill-emerald-500 text-white" />
              <span className="max-w-full text-[12px] font-bold uppercase leading-snug tracking-wide text-navy-900">
                {rate}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketPlanSection;
