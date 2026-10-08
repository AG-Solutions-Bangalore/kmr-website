import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Remote decorative assets (web_images/) — banners stay local for LCP.
import { webImage } from "@/lib/web-images";
import { useCategories } from "@/modules/category";

const leaf1 = webImage("category/leaf1.webp");
const leaf2 = webImage("category/laef2.webp");
const leaf3 = webImage("category/leaf3.webp");

gsap.registerPlugin(ScrollTrigger);

export function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  // API-only: no static fallback. Skeletons show while loading.
  const { data, isLoading } = useCategories();
  const CATEGORIES = data ?? [];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 1. Header Elements: Smooth, sequential entry
      tl.fromTo(
        ".category-header-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        },
      );

      // 2. Decorative Leaves: Enter and then float continuously
      tl.fromTo(
        ".category-leaf",
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out",
          onComplete: () => {
            // Apply continuous floating effect
            gsap.to(".category-leaf", {
              y: "-=15",
              rotation: "+=4",
              duration: 3,
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
        "-=0.6",
      );

      // 3. Category Cards: Cinematic grid stagger
      tl.fromTo(
        ".category-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.05,
            from: "start",
          },
          ease: "expo.out",
          clearProps: "all", // Clears inline transforms to allow hover scale
        },
        "-=1.2",
      );
    },
    { scope: sectionRef, dependencies: [CATEGORIES.length] },
  );

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5fafe] to-white py-12 sm:py-16 scroll-mt-20"
    >
      {/* Decorative Leaves - Flushed to corners with blur layering */}
      <img
        src={leaf3}
        alt=""
        loading="lazy"
        decoding="async"
        className="category-leaf absolute -left-28 blur-[0.5px] bottom-0 h-auto w-32 object-contain object-left-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />
      <img
        src={leaf2}
        alt=""
        loading="lazy"
        decoding="async"
        className="category-leaf absolute -left-20 blur-[0.1px] top-0 h-auto w-32 object-contain object-left-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />
      <img
        src={leaf1}
        alt=""
        loading="lazy"
        decoding="async"
        className="category-leaf absolute right-0 blur-[0.2px] top-0 h-auto w-52 object-contain object-right-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1300px]">
        {/* Header Row */}
        <div className="mb-8 md:mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            <div className="category-header-element mb-3 sm:mb-4 flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              OUR CATEGORIES
            </div>
            <h2 className="category-header-element mb-2 sm:mb-3 text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-navy-900">
              Explore Our Categories
            </h2>
            <p className="category-header-element font-medium text-muted-500 text-[13px] sm:text-[14px]">
              Get detailed market information across a wide range of
              commodities.
            </p>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="category-card flex min-h-[130px] sm:min-h-[140px] flex-col items-center justify-center rounded-2xl border border-mist-100 bg-white px-2.5 py-4 sm:px-3 sm:py-5"
                >
                  <div className="mb-2 h-[60px] sm:h-[70px] w-full max-w-[90px] animate-pulse rounded-xl bg-mist-100" />
                  <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-mist-100" />
                </div>
              ))
            : CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="category-card group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-mist-100 bg-white px-2.5 py-4 sm:px-3 sm:py-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] min-h-[130px] sm:min-h-[140px]"
            >
              <div className="relative mb-2 flex h-[60px] sm:h-[70px] w-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-center text-[13px] sm:text-[14px] font-bold text-navy-900 transition-colors duration-300 group-hover:text-[#145eb5]">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
