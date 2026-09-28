import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Asset imports
import leaf1 from "@/assets/category/leaf1.png";
import leaf3 from "@/assets/category/leaf3.png";

gsap.registerPlugin(ScrollTrigger);

const INSIGHTS_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1474128670149-7082a8d370eb?auto=format&fit=crop&q=80&w=800",
    tag: "MARKET TREND",
    date: "28 Sep 2026",
    title: "Edible Oil prices show upward movement in major markets",
    excerpt:
      "Analysts expect continued demand due to seasonal factors and global trends...",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    tag: "COMMODITY UPDATE",
    date: "27 Sep 2026",
    title: "Rice market sees increased demand across India",
    excerpt:
      "With festive season approaching, rice demand has increased in key markets...",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757ffe7273?auto=format&fit=crop&q=80&w=800",
    tag: "EXPERT ANALYSIS",
    date: "26 Sep 2026",
    title: "Pulses market remains stable amid supply balance",
    excerpt:
      "Current supply levels are maintaining price stability in key markets...",
  },
];

export function MarketInsightsSection() {
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

      // Header animation
      tl.fromTo(
        ".insight-header-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        },
      );

      // Cards stagger
      tl.fromTo(
        ".insight-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          clearProps: "all",
        },
        "-=0.6",
      );

      // Leaves entry
      tl.fromTo(
        ".insight-leaf",
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out",
          onComplete: () => {
            gsap.to(".insight-leaf", {
              y: "-=10",
              rotation: "+=3",
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: {
                amount: 1,
                from: "random",
              },
            });
          },
        },
        "-=1.0",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-white"
    >
      {/* Decorative Leaves */}
      {/* User mentioned "bottom left", but arrow points right. I'll add subtle leaves to both sides for balance */}
      <img
        src={leaf3}
        alt=""
        className="insight-leaf absolute -left-28 top-10 h-auto w-48 object-contain mix-blend-multiply md:w-64 lg:w-80 pointer-events-none blur-[0.5px]"
      />
      <img
        src={leaf1}
        alt=""
        className="insight-leaf absolute -right-20 -bottom-10 h-auto w-52 object-contain mix-blend-multiply md:w-64 lg:w-80 pointer-events-none blur-[1px]"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1300px]">
        {/* Header Row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-14">
          <div className="flex flex-col items-start max-w-2xl">
            <div className="insight-header-element mb-4 flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]"></span>
              MARKET INSIGHTS
            </div>
            <h2 className="insight-header-element mb-3 text-3xl font-extrabold tracking-tight text-navy-900 lg:text-[2.2rem]">
              Latest Market Insights
            </h2>
            <p className="insight-header-element font-medium text-muted-500 text-[14px]">
              Stay informed with expert analysis, news and trends from the
              commodity market.
            </p>
          </div>

          <Button
            variant="outline"
            className="insight-header-element group hidden h-[42px] rounded-lg border-[#145eb5]/30 bg-white px-6 font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:flex"
          >
            View All Insights
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INSIGHTS_DATA.map((insight) => (
            <div
              key={insight.id}
              className="insight-card group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 border border-teal-100">
                    {insight.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-400">
                    {insight.date}
                  </span>
                </div>

                <h3 className="mb-3 text-[16px] font-extrabold leading-tight text-navy-900 transition-colors duration-300 group-hover:text-[#145eb5] line-clamp-2">
                  {insight.title}
                </h3>

                <p className="mb-6 text-[13px] font-medium leading-[1.6] text-muted-500 line-clamp-2">
                  {insight.excerpt}
                </p>

                <div className="mt-auto flex items-center text-[13px] font-bold text-[#145eb5]">
                  Read More
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile button */}
        <Button
          variant="outline"
          className="group mt-8 h-[46px] w-full rounded-lg border-[#145eb5] bg-white font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:hidden"
        >
          View All Insights
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
