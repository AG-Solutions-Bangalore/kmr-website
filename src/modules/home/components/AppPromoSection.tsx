import { webImage } from "@/lib/web-images";

// App banner served from `web_images/` (same folder structure as local).
const appBanner = webImage("home/kmr_live_app_banner.webp");

// Store badges served from `web_images/` (same filenames as local).
const appStoreIcon = webImage("icons/App_Store_(iOS).svg");
const playStoreIcon = webImage("icons/playStore-logo.svg");
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Remote decorative asset (web_images/) — banner stays local for LCP.
const leaf4 = webImage("category/leaf4.webp");

const BULLETS = [
  "Live commodity prices",
  "Daily market insights",
  "Easy category browsing",
  "Simple and user-friendly",
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
        "-=0.6",
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
        "-=0.8",
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
        <div className="absolute inset-0 bg-white/90 sm:bg-white/80 md:bg-transparent md:bg-gradient-to-r md:from-white md:via-white/95 md:to-transparent w-full md:w-[45%]"></div>
        {/* Subtle white gradient on the right to make the icons pop over the farm image */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/60 to-transparent w-full md:w-[30%] left-auto right-0 hidden lg:block"></div>

        {/* Decorative Leaf on the left */}
        <img
          src={leaf4}
          alt=""
          loading="lazy"
          decoding="async"
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

            <h2 className="promo-element mb-2 text-2xl sm:text-[28px] font-extrabold tracking-tight text-navy-900 lg:text-[2.2rem] leading-[1.15] lg:leading-[1.1]">
              Your Market.
              <br />
              In Your Pocket.
            </h2>

            <p className="promo-element mb-4 max-w-[380px] text-[13px] font-medium leading-[1.5] text-muted-500">
              Get real-time market information, trends and insights wherever
              your business takes you.
            </p>

            <ul className="mb-5 flex flex-col gap-2">
              {BULLETS.map((bullet, idx) => (
                <li
                  key={idx}
                  className="promo-element flex items-center gap-2.5"
                >
                  <CheckCircle2 className="h-4 w-4 fill-[#145eb5] text-white shrink-0" />
                  <span className="text-[13px] font-bold text-navy-900/80">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="promo-element flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-2 rounded-[10px] bg-black px-4 py-2.5 sm:py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 active:scale-95 w-full sm:w-auto">
                <img
                  src={appStoreIcon}
                  alt="Apple Logo"
                  className="h-6 w-6 object-contain"
                />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] font-medium tracking-wide leading-[1] text-white/80">
                    Download on the
                  </span>
                  <span className="text-[15px] font-semibold leading-[1.1]">
                    App Store
                  </span>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="flex items-center justify-center gap-2 rounded-[10px] bg-black px-4 py-2.5 sm:py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 active:scale-95 w-full sm:w-auto">
                <img
                  src={playStoreIcon}
                  alt="Google Play Logo"
                  className="h-6 w-6 object-contain"
                />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] font-medium tracking-wide leading-[1] text-white/80">
                    GET IT ON
                  </span>
                  <span className="text-[15px] font-semibold leading-[1.1]">
                    Google Play
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
