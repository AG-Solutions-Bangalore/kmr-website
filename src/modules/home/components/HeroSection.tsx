import { useRef } from "react";
import { webImage } from "@/lib/web-images";

// Hero banner served from `web_images/` (same folder structure as local).
const heroBanner = webImage("home/hero_banner_with_phone.webp");
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { TRUST_ITEMS } from "../data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create a master timeline for perfectly orchestrated choreography
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Cinematic reveal of the main text block
      tl.from(".hero-item", {
        y: 35,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.08,
        delay: 0.1,
      })
        // 2. Trust icons gracefully scale and drop in, slightly overlapping
        .from(
          ".hero-icon-item",
          {
            y: 20,
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "back.out(1.4)", // Adds a tiny, elegant bounce at the end
          },
          "-=0.6",
        )
        // 3. The handwritten note staggering slowly, line by line
        .from(
          ".tagline-word",
          {
            x: 20,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.4, // Slow stagger so they come one by one
            ease: "power3.out",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="home"
      ref={containerRef}
      style={{ backgroundImage: `url(${heroBanner})` }}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      {/* readability overlay — keeps left text legible over the banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-white via-white/95 to-white/70 md:to-transparent md:w-[75%] lg:w-[60%] lg:from-white lg:via-white/90 lg:to-transparent"
      />

      {/* handwritten tagline — right side, personal touch */}
      <p
        aria-hidden="true"
        className="hero-tagline absolute right-10 top-10 z-10 hidden -rotate-10 text-right font-script text-3xl font-bold leading-[0.8] drop-shadow-sm md:block lg:right-14 lg:text-4xl xl:right-12"
      >
        <span className="tagline-word block">From</span>
        <span className="tagline-word block">Markets</span>
        <span className="tagline-word block">to Opportunities</span>
      </p>

      <div className="container relative flex min-h-[85vh] lg:min-h-[90vh] items-center py-10 sm:py-14 lg:py-20">
        <div className="max-w-xl w-full">
          {/* eyebrow pill */}
          <p className="hero-item inline-flex items-center gap-2 rounded-full bg-success-500/10 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-muted-700 border border-mist-200">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-success-500" />
            Real Market Information
          </p>

          {/* heading */}
          <h1 className="hero-item mt-4 text-[32px] sm:text-5xl lg:text-[4.1rem] font-extrabold leading-[1.12] lg:leading-[1.08] tracking-tight text-navy-800">
            Market Trends
            <br />
            Real Insights
            <br />
            <span className="text-primary-500">Smarter Decisions</span>
          </h1>

          {/* subtext */}
          <p className="hero-item mt-4 max-w-md text-[14px] sm:text-[15px] leading-relaxed font-semibold text-muted-600">
            Get real-time commodity prices, market trends and expert insights to
            make informed business decisions.
          </p>

          {/* CTA buttons */}
          <div className="hero-item mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button size="lg" asChild className="group rounded-full w-full sm:w-auto justify-center">
              <a href="#categories">
                Explore Categories
                <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="group rounded-full w-full sm:w-auto justify-center">
              <a href="#app">
                Download App
                <Download className="transition-transform duration-300 ease-out group-hover:-translate-y-1" />
              </a>
            </Button>
          </div>

          {/* trust icons row */}
          <dl className="mt-8 sm:mt-10 grid max-w-lg grid-cols-4 gap-1.5 sm:gap-4">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="hero-icon-item flex flex-col items-center gap-2 sm:gap-3 text-center"
              >
                <dt className="sr-only">{item.label}</dt>
                <span
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-sm md:h-[52px] md:w-[52px] ${item.bgClass} ${item.colorClass}`}
                >
                  {item.icon}
                </span>
                <dd className="text-[9px] font-semibold leading-tight text-navy-800 sm:text-[11px]">
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
