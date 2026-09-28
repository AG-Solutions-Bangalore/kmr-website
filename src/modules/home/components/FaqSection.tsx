import { useState, useRef } from "react";
import { Plus, ChevronUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import chatImage from "@/assets/home/3d_chat_image.png";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What is KMR LIVE?",
    answer:
      "KMR LIVE provides real-time commodity market information, trends and insights to help traders, businesses and individuals make informed decisions.",
  },
  {
    question: "How often is the market data updated?",
    answer:
      "Our market data is updated in real-time throughout the trading day to ensure you always have the most current information at your fingertips.",
  },
  {
    question: "Which commodities are covered?",
    answer:
      "We cover a wide range of agricultural and non-agricultural commodities including grains, edible oils, pulses, spices, and more across major markets.",
  },
  {
    question: "Is the KMR LIVE app free to use?",
    answer:
      "KMR LIVE offers a basic free tier with limited access, along with premium subscription plans that unlock advanced features, historical data, and deep market analysis.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Left content
      tl.fromTo(
        ".faq-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        },
      );

      // Accordion slide in
      tl.fromTo(
        ".faq-accordion",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.6",
      );

      // Continuous float animation for the 3D chat image
      gsap.to(imageRef.current, {
        y: "-=12",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b py-8 from-[#f8fbff] to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Zone 1: 3D Chat Icon */}
          <div className="faq-element w-48 sm:w-56 lg:w-[32%] shrink-0 flex justify-center">
            <img
              ref={imageRef}
              src={chatImage}
              alt="FAQ 3D Chat"
              className="w-full h-[150%] drop-shadow-xl"
            />
          </div>

          {/* Zone 2: Text Content */}
          <div className="faq-element flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-[280px]">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-[#145eb5]/30 bg-[#145eb5]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] whitespace-nowrap">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#145eb5]"></span>
              FREQUENTLY ASKED QUESTIONS
            </div>

            <h2 className="mb-4 text-[36px] font-extrabold tracking-tight text-navy-900 lg:text-[44px]">
              FAQ
            </h2>

            <p className="max-w-[280px] text-[15px] font-medium leading-[1.6] text-muted-500">
              Find answers to common questions about KMR LIVE.
            </p>
          </div>

          {/* Right Column (Accordion) */}
          <div className="faq-accordion w-full lg:w-[50%] shrink-0 rounded-[24px] bg-white p-6 md:p-8 shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-navy-900/5">
            <div className="flex flex-col divide-y divide-gray-100">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="py-5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-4 text-left outline-none transition-colors"
                    >
                      <span
                        className={`text-[16px] font-bold transition-colors duration-300 ${isOpen ? "text-[#145eb5]" : "text-navy-900 group-hover:text-[#145eb5]"}`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`flex shrink-0 items-center justify-center transition-colors duration-300 ${isOpen ? "text-[#145eb5]" : "text-navy-900 group-hover:text-[#145eb5]"}`}
                      >
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={2.5} />
                        )}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[14px] leading-relaxed text-muted-500 font-medium pb-1 pr-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
