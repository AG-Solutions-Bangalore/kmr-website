import { CheckCircle2, ShieldCheck, TrendingUp, Lightbulb } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import appBanner from "@/assets/home/kmr_live_app_banner.png";
import appStoreIcon from "@/assets/icons/App_Store_(iOS).svg";
import playStoreIcon from "@/assets/icons/playStore-logo.svg";
import leaf4 from "@/assets/category/leaf4.png";

gsap.registerPlugin(ScrollTrigger);

const BULLETS = [
  "Live commodity prices",
  "Daily market insights",
  "Easy category browsing",
  "Simple and user-friendly"
];

const RIGHT_FEATURES = [
  { text: "Reliable Insights", icon: <ShieldCheck className="h-[22px] w-[22px] text-navy-900" strokeWidth={2} /> },
  { text: "Real Growth", icon: <TrendingUp className="h-[22px] w-[22px] text-navy-900" strokeWidth={2} /> },
  { text: "Smarter Decisions", icon: <Lightbulb className="h-[22px] w-[22px] text-navy-900" strokeWidth={2} /> },
];

export function AppPromoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Left content cascade
      tl.fromTo(
        ".promo-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        },
      );

      // Decorative leaf entry
      tl.fromTo(
        ".promo-leaf",
        { x: -50, opacity: 0, rotation: -15 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(".promo-leaf", {
              y: "-=15",
              rotation: "+=4",
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          },
        },
        "-=0.6"
      );

      // Right features pop in
      tl.fromTo(
        ".promo-feature",
        { x: 30, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.8"
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 lg:py-10 overflow-hidden bg-white flex items-center"
    >
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={appBanner}
          alt="KMR Live App"
          className="w-full h-full object-cover object-center"
        />
        {/* Strong white gradient overlay on the left to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full md:w-[45%]"></div>
        {/* Subtle white gradient on the right to make the icons pop over the farm image */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/60 to-transparent w-full md:w-[30%] left-auto right-0 hidden lg:block"></div>
        
        {/* Decorative Leaf on the left */}
        <img
          src={leaf4}
          alt=""
          className="promo-leaf absolute -left-12 bottom-0 h-auto w-32 md:w-48 lg:w-56 object-contain mix-blend-multiply pointer-events-none blur-[0.5px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1300px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="flex w-full lg:w-[45%] flex-col items-start">
            <div className="promo-element mb-3 flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-teal-700">
              <span className="h-1 w-1 rounded-full bg-teal-500"></span>
              KMR LIVE APP
            </div>
            
            <h2 className="promo-element mb-2 text-[28px] font-extrabold tracking-tight text-navy-900 lg:text-[2.2rem] leading-[1.1]">
              Your Market.<br />
              In Your Pocket.
            </h2>
            
            <p className="promo-element mb-4 max-w-[380px] text-[13px] font-medium leading-[1.5] text-muted-500">
              Get real-time market information, trends and insights wherever your business takes you.
            </p>

            <ul className="mb-5 flex flex-col gap-2">
              {BULLETS.map((bullet, idx) => (
                <li key={idx} className="promo-element flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 fill-[#145eb5] text-white shrink-0" />
                  <span className="text-[13px] font-bold text-navy-900/80">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="promo-element flex flex-wrap items-center gap-3 mt-2">
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-2 rounded-[10px] bg-black px-4 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 active:scale-95">
                <img src={appStoreIcon} alt="Apple Logo" className="h-6 w-6 object-contain" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] font-medium tracking-wide leading-[1] text-white/80">Download on the</span>
                  <span className="text-[15px] font-semibold leading-[1.1]">App Store</span>
                </div>
              </button>
              
              {/* Google Play Button */}
              <button className="flex items-center justify-center gap-2 rounded-[10px] bg-black px-4 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 active:scale-95">
                <img src={playStoreIcon} alt="Google Play Logo" className="h-6 w-6 object-contain" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] font-medium tracking-wide leading-[1] text-white/80">GET IT ON</span>
                  <span className="text-[15px] font-semibold leading-[1.1]">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content (Features - Desktop Only) */}
          <div className="hidden lg:flex w-[25%] flex-col gap-6 items-start justify-center pr-4">
            {RIGHT_FEATURES.map((feat, idx) => (
              <div key={idx} className="promo-feature group flex items-center gap-3 cursor-default">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#145eb5]/10 bg-white/80 backdrop-blur-md shadow-[0_4px_15px_rgb(0,0,0,0.05)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#145eb5] group-hover:text-white group-hover:shadow-[0_8px_25px_rgba(20,94,181,0.25)]">
                  <div className="text-navy-900 group-hover:text-white transition-colors duration-300 transform scale-90">
                    {feat.icon}
                  </div>
                </div>
                <span className="text-[16px] font-bold text-navy-900 drop-shadow-sm font-serif italic tracking-tight">
                  {feat.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
