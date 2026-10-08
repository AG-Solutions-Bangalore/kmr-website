import { useRef, useState } from 'react';
import { Plus, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import chatImage from '@/assets/home/3d_chat_image.webp';
import { usePageFaqSlug, useFaqs } from '../hook/useFaqs';
import { HOME_FALLBACK_FAQS } from '../data/fallbackFaqs';
import type { Faq } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface FaqSectionProps {
  /** CRM slug to fetch. Defaults to the slug derived from the current route. */
  slug?: string;
  /**
   * Static FAQs shown on the `home` slug while the API has no rows.
   * Defaults to the built-in home fallback; pass `[]` to disable fallback.
   */
  fallbackFaqs?: Faq[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Global FAQ section — mount once (e.g. in MainLayout) and it shows
 * on every page that has FAQ rows for its slug.
 * - API rows win when present.
 * - On the `home` slug, static fallback FAQs keep the section visible
 *   until the CRM is populated (override/disable via `fallbackFaqs`).
 * - Otherwise renders NOTHING while loading, on error, or when empty.
 */
export function FaqSection({
  slug,
  fallbackFaqs = HOME_FALLBACK_FAQS,
  eyebrow = 'Frequently Asked Questions',
  title = 'FAQ',
  subtitle = 'Find answers to common questions about KMR LIVE.',
}: FaqSectionProps) {
  const pageSlug = usePageFaqSlug();
  const activeSlug = slug ?? pageSlug;
  const { data } = useFaqs(activeSlug);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const apiFaqs = data ?? [];
  const faqs = apiFaqs.length > 0 ? apiFaqs : activeSlug === 'home' ? fallbackFaqs : [];
  const hasFaqs = faqs.length > 0;

  useGSAP(
    () => {
      if (!sectionRef.current || !hasFaqs) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Left content
      tl.fromTo(
        '.faq-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
        },
      );

      // Accordion slide in
      tl.fromTo(
        '.faq-accordion',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6',
      );

      // Continuous float animation for the 3D chat image
      gsap.to(imageRef.current, {
        y: '-=12',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    },
    { scope: sectionRef, dependencies: [hasFaqs, activeSlug] },
  );

  // No FAQs (loading / error / empty, no fallback) → render nothing.
  if (!hasFaqs) return null;

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b py-8 from-[#f8fbff] to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Zone 1: 3D Chat Icon */}
          <div className="faq-element w-36 sm:w-48 lg:w-[32%] shrink-0 flex justify-center">
            <img
              ref={imageRef}
              src={chatImage}
              alt="FAQ 3D Chat"
              className="w-full h-auto max-w-[200px] lg:max-w-none drop-shadow-xl"
            />
          </div>

          {/* Zone 2: Text Content */}
          <div className="faq-element flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0 lg:min-w-[280px]">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 rounded-full border border-[#145eb5]/30 bg-[#145eb5]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] whitespace-nowrap">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#145eb5]"></span>
              {eyebrow}
            </div>

            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-[36px] font-extrabold tracking-tight text-navy-900 lg:text-[44px]">
              {title}
            </h2>

            <p className="max-w-[280px] text-[14px] sm:text-[15px] font-medium leading-[1.6] text-muted-500">
              {subtitle}
            </p>
          </div>

          {/* Right Column (Accordion) */}
          <div className="faq-accordion w-full lg:w-[50%] shrink-0 rounded-2xl sm:rounded-[24px] bg-white p-4 sm:p-6 md:p-8 shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-navy-900/5">
            <div className="flex flex-col divide-y divide-gray-100">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={faq.id} className="py-5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-4 text-left outline-none transition-colors"
                    >
                      <span
                        className={`text-[16px] font-bold transition-colors duration-300 ${isOpen ? 'text-[#145eb5]' : 'text-navy-900 group-hover:text-[#145eb5]'}`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`flex shrink-0 items-center justify-center transition-colors duration-300 ${isOpen ? 'text-[#145eb5]' : 'text-navy-900 group-hover:text-[#145eb5]'}`}
                      >
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={2.5} />
                        )}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
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

export default FaqSection;
