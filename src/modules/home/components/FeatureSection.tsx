import { BarChart3, LineChart, FileText, Bell } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import featureBanner from "@/assets/home/hero_feature_banner.png";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: <BarChart3 className="h-6 w-6 text-emerald-500" strokeWidth={2.5} />,
    title: "Real-time Market Data",
    desc: "Get the latest prices from major markets across India.",
    iconBg: "bg-emerald-50",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    icon: <LineChart className="h-6 w-6 text-blue-500" strokeWidth={2.5} />,
    title: "Market Trends",
    desc: "Track historical data and identify market movements.",
    iconBg: "bg-blue-50",
    hoverBorder: "hover:border-blue-200",
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-500" strokeWidth={2.5} />,
    title: "Expert Insights",
    desc: "Stay informed with news and analysis from the industry.",
    iconBg: "bg-amber-50",
    hoverBorder: "hover:border-amber-200",
  },
  {
    icon: <Bell className="h-6 w-6 text-purple-500" strokeWidth={2.5} />,
    title: "Instant Updates",
    desc: "Never miss important market changes with timely notifications.",
    iconBg: "bg-purple-50",
    hoverBorder: "hover:border-purple-200",
  },
];

export function FeatureSection() {
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
        ".feature-header-element",
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
        ".feature-card",
        { y: 40, opacity: 0, scale: 0.95 },
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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 overflow-hidden bg-white"
    >
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={featureBanner}
          alt="Features Background"
          className="w-full h-full object-cover object-right"
        />
        {/* Pure white overlay on the left fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full md:w-[70%]"></div>
        {/* Secondary subtle overlay for the whole width to ensure text readability */}
        <div className="absolute inset-0 bg-white/40 md:hidden"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1300px]">
        {/* Header */}
        <div className="mb-6 lg:mb-8 max-w-2xl">
          <div className="feature-header-element mb-3 flex w-fit items-center gap-2 rounded-full border border-blue-200/50 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]"></span>
            FEATURES
          </div>
          <h2 className="feature-header-element mb-2 text-2xl sm:text-[28px] font-extrabold tracking-tight text-navy-900 lg:text-[2rem] leading-[1.2]">
            Everything You Need
            <br className="hidden sm:block" />
            for Better Market Decisions
          </h2>
          <p className="feature-header-element font-medium text-muted-500 text-[13px]">
            Accurate data, timely insights and easy access - all in one place.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`feature-card group flex flex-row items-center gap-3 rounded-2xl border border-mist-100 bg-white p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] ${feature.hoverBorder}`}
            >
              <div
                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] ${feature.iconBg} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="mb-0.5 text-[13px] font-extrabold text-navy-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] leading-[1.3] font-medium text-muted-500">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
