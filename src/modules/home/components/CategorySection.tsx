import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Asset imports
import leaf1 from "@/assets/category/leaf1.png";
import leaf2 from "@/assets/category/laef2.png";
import leaf3 from "@/assets/category/leaf3.png";
import edibleOil from "@/assets/category/edible_oil_image.png";
import coconutOil from "@/assets/category/coconut_oil_image.png";
import pulses from "@/assets/category/pulses_image.png";
import gnSeed from "@/assets/category/GN_Seed_image.png";
import ricePaddy from "@/assets/category/richAndpaddy_image.png";
import kirana from "@/assets/category/kirana_image.png";
import spices from "@/assets/category/spices_image.png";
import dryFruits from "@/assets/category/dryFruits_image.png";
import arecanut from "@/assets/category/Arcanut_image.png";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: "Edible Oil", image: edibleOil },
  { name: "Coconut Oil", image: coconutOil },
  { name: "Pulses", image: pulses },
  { name: "GN Seed", image: gnSeed },
  { name: "Rice & Paddy", image: ricePaddy },
  { name: "Kirana", image: kirana },
  { name: "Spices", image: spices },
  { name: "Dry Fruits", image: dryFruits },
  { name: "Arecanut", image: arecanut },
];

export function CategorySection() {
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
                from: "random"
              }
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
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5fafe] to-white py-16"
    >
      {/* Decorative Leaves - Flushed to corners with blur layering */}
      <img
        src={leaf3}
        alt=""
        className="category-leaf absolute -left-28 blur-[0.5px] bottom-0 h-auto w-32 object-contain object-left-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />
      <img
        src={leaf2}
        alt=""
        className="category-leaf absolute -left-20 blur-[0.1px] top-0 h-auto w-32 object-contain object-left-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />
      <img
        src={leaf1}
        alt=""
        className="category-leaf absolute right-0 blur-[0.2px] top-0 h-auto w-52 object-contain object-right-top mix-blend-multiply md:w-48 lg:w-64 xl:w-80 pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1300px]">
        {/* Header Row */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            <div className="category-header-element mb-4 flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              OUR CATEGORIES
            </div>
            <h2 className="category-header-element mb-3 text-3xl font-extrabold tracking-tight text-navy-900 lg:text-[2.2rem]">
              Explore Our Categories
            </h2>
            <p className="category-header-element font-medium text-muted-500 text-[14px]">
              Get detailed market information across a wide range of
              commodities.
            </p>
          </div>

          <Button
            variant="outline"
            className="category-header-element group hidden h-[42px] rounded-lg border-[#145eb5]/30 px-6 font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:flex"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="category-card group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-mist-100 bg-white px-3 py-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] min-h-[140px]"
            >
              <div className="relative flex h-[80px] w-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:scale-110">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="absolute bottom-4 text-center text-[14px] font-extrabold text-navy-900 opacity-0 translate-y-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-[#145eb5]">
                {cat.name}
              </h3>
            </div>
          ))}

          {/* Special "View All" Card */}
          <div className="category-card group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-mist-100 bg-white px-3 py-5 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] min-h-[140px]">
            <div className="relative mb-3 flex w-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-blue-50 text-[#145eb5] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#145eb5] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <Plus strokeWidth={3} className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-center text-[13px] font-extrabold leading-tight text-navy-900 transition-colors duration-300 group-hover:text-[#145eb5]">
              View All
              <br />
              Categories
            </h3>
          </div>
        </div>

        {/* Mobile button */}
        <Button
          variant="outline"
          className="group mt-8 h-[46px] w-full rounded-lg border-[#145eb5] font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:hidden"
        >
          View All Categories
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
