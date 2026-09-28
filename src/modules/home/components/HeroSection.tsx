import heroBanner from "@/assets/home/hero_banner_with_phone.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { TRUST_ITEMS } from "../data";

function HeroSection() {
  return (
    <section
      id="home"
      style={{ backgroundImage: `url(${heroBanner})` }}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      {/* readability overlay — keeps left text legible over the banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-white via-white/85 to-transparent md:w-[75%] lg:w-[60%] lg:from-white lg:via-white/90 lg:to-transparent"
      />

      {/* handwritten tagline — right side, like the design */}
      <p
        aria-hidden="true"
        className="absolute right-10 top-10 z-10 hidden -rotate-10 text-right font-script text-3xl font-bold leading-[0.8] drop-shadow-sm md:block lg:right-14 lg:text-4xl xl:right-12"
      >
        From
        <br />
        Markets
        <br />
        to Opportunities
      </p>

      <div className="container relative flex min-h-[90vh] items-center py-14 lg:py-20">
        <div className="max-w-xl">
          {/* eyebrow pill */}
          <p className="inline-flex items-center gap-2 rounded-full bg-success-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-700 border border-mist-200">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-success-500" />
            Real Market Information
          </p>

          {/* heading */}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-800 sm:text-5xl lg:text-[3.4rem]">
            Market Trends
            <br />
            Real Insights
            <br />
            <span className="text-primary-500">Smarter Decisions</span>
          </h1>

          {/* subtext */}
          <p className="mt-4 max-w-md text-[15px] leading-relaxed font-semibold text-muted-600">
            Get real-time commodity prices, market trends and expert insights to
            make informed business decisions.
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#categories">
                Explore Categories
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#app">
                Download App
                <Download />
              </a>
            </Button>
          </div>

          {/* trust icons row */}
          <dl className="mt-10 grid max-w-lg grid-cols-4 gap-2 sm:gap-4">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 text-center"
              >
                <dt className="sr-only">{item.label}</dt>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-800 md:h-[52px] md:w-[52px]">
                  {item.icon}
                </span>
                <dd className="text-[10px] font-semibold leading-tight text-navy-800 sm:text-[11px]">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
