import { MarketTicker } from "./MarketTicker";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lightbulb, Handshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import aboutHeroImage from "@/assets/home/hero_abou-use_image.webp";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: (
      <Target className="h-[28px] w-[28px] text-blue-500" strokeWidth={2} />
    ),
    title: "Our Vision",
    desc: "To be the most trusted source for commodity market information.",
    iconBg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: (
      <Lightbulb className="h-[28px] w-[28px] text-amber-500" strokeWidth={2} />
    ),
    title: "Our Mission",
    desc: "Deliver accurate, timely and easy-to-access market insights for smarter decisions.",
    iconBg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: (
      <Handshake
        className="h-[28px] w-[28px] text-purple-500"
        strokeWidth={2}
      />
    ),
    title: "Our Values",
    desc: "Accuracy\nTransparency\nTrust\nCustomer Focus",
    iconBg: "bg-purple-50",
    border: "border-purple-100",
  },
];

export function HeroAboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Subtle entry animation triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".about-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".about-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".about-image",
          {
            x: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-6 overflow-hidden"
    >
      {/* Right Image: Absolutely positioned to bleed to the right edge and sit behind the ticker */}
      <div className="about-image absolute -right-6 -top-2.5 h-full w-full max-w-[32%] z-0 flex items-start justify-end pointer-events-none hidden md:flex">
        <img
          src={aboutHeroImage}
          alt="Empowering Markets Enriching Lives"
          className="h-full w-auto object-contain object-right-top"
        />
      </div>

      {/* Market Ticker at the top of this section (sits over the blue wave of the image) */}
      <div className="container relative z-20 mb-8">
        <MarketTicker />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-stretch justify-start">
        {/* Left: About Content */}
        <div className="about-content flex w-full lg:w-[35%] flex-col justify-center items-start">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]"></span>
            ABOUT US
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold leading-[1.18] lg:leading-[1.15] text-navy-900 mb-4 sm:mb-5 tracking-tight">
            Your Trusted Partner
            <br />
            in Commodity Market Information
          </h2>

          <p className="text-[13px] sm:text-[13.5px] leading-[1.7] text-muted-500 mb-6 sm:mb-8 font-medium max-w-md">
            KMR LIVE provides real-time commodity market information, trends and
            insights to help traders, businesses and individuals make smarter
            decisions. Our goal is to bring transparency, reliability and timely
            market updates to the agricultural and commodity industry.
          </p>

          <Button
            size="lg"
            className="group bg-[#145eb5] hover:bg-[#145eb5]/90 text-white font-bold px-7 h-[46px] rounded-lg shadow-md transition-all w-full sm:w-auto justify-center"
          >
            Know More About Us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </Button>
        </div>

        {/* Middle: 3 Cards */}
        <div className="flex flex-col sm:flex-row lg:flex-row w-full lg:w-[40%] items-stretch lg:items-center justify-start gap-3.5 sm:gap-2 mt-8 lg:mt-0">
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className={`about-card flex flex-1 flex-col items-center text-center rounded-[1.25rem] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border ${card.border} transition-transform hover:-translate-y-1.5 duration-300 min-h-[200px] sm:min-h-[220px]`}
            >
              <div
                className={`mb-4 flex h-[52px] w-[52px] sm:h-[56px] sm:w-[56px] items-center justify-center rounded-full ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <h3 className="mb-2 text-[14px] font-bold text-navy-900">
                {card.title}
              </h3>
              <p className="text-[11px] leading-[1.6] text-muted-500 font-medium px-1 whitespace-pre-line">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
