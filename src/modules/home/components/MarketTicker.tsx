import { useRef } from "react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TICKER_DATA = [
  { label: "Edible Oil", price: "₹124.50", change: "2.4%", up: true },
  { label: "Coconut Oil", price: "₹118.20", change: "1.8%", up: true },
  { label: "Pulses", price: "₹96.40", change: "0.7%", up: false },
  { label: "Rice", price: "₹58.20", change: "1.2%", up: true },
  { label: "Arecanut", price: "₹410.00", change: "3.7%", up: true },
  // Adding a few more to ensure smooth looping on ultra-wide screens
  { label: "Spices", price: "₹85.00", change: "1.1%", up: true },
  { label: "Wheat", price: "₹32.40", change: "0.4%", up: false },
];

export function MarketTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Infinite marquee animation using GSAP
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 35, // Adjust this for speed
        repeat: -1,
      });

      // Animate the ticker container popping up when the hero section loads
      gsap.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8, // Plays right after the hero text and icons
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="container relative flex items-center overflow-hidden rounded-xl bg-navy-800 px-2.5 py-3 sm:px-3 sm:py-4 text-xs sm:text-[13px] text-white shadow-2xl ring-1 ring-white/10 md:px-5"
    >
      {/* Fixed Left Section */}
      <div className="z-10 flex shrink-0 items-center gap-2 sm:gap-3 bg-navy-800 pr-2 md:pr-4 md:gap-4 relative">
        <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-red-600 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          LIVE
        </div>
        <span className="hidden font-semibold text-white/90 md:block">
          Today's Market Highlights
        </span>

        {/* Divider */}
        <div className="ml-2 hidden h-5 w-px bg-white/20 md:block" />

        {/* Gradient mask to blend scrolling text nicely */}
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-navy-800 to-transparent translate-x-full pointer-events-none" />
      </div>

      {/* Scrolling Ticker Section */}
      <div className="flex flex-1 overflow-hidden pointer-events-none">
        <div
          ref={trackRef}
          className="flex w-fit items-center gap-4 sm:gap-6 whitespace-nowrap pl-2 sm:pl-4"
        >
          {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-medium text-white/70">{item.label}</span>
              <span className="font-bold text-white">{item.price}</span>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-bold ${
                  item.up ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {item.up ? (
                  <TrendingUp className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <TrendingDown className="h-3 w-3" strokeWidth={3} />
                )}
                {item.change}
              </span>
              {/* Separator */}
              <span className="ml-4 text-white/20">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Action */}
      <div className="z-10 ml-auto flex shrink-0 items-center pl-2 sm:pl-3 bg-navy-800 relative">
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-navy-800 to-transparent -translate-x-full pointer-events-none" />
        <button className="group flex h-[26px] w-[26px] sm:h-[28px] sm:w-[28px] items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
