import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import {
  useCompany,
  formatIndianMobile,
  COMPANY_FALLBACK,
} from "@/modules/company";
import leaf5 from "../../../assets/category/leaf5.webp";
import leaf6 from "../../../assets/category/leaf6.webp";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftLeafRef = useRef<HTMLImageElement>(null);
  const rightLeafRef = useRef<HTMLImageElement>(null);
  const { data: company = COMPANY_FALLBACK } = useCompany();

  useEffect(() => {
    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Continuous leaf floating animation
      gsap.to(leftLeafRef.current, {
        y: "-=15",
        rotation: "-=5",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Spices bowl entrance animation (animates only once)
      gsap.fromTo(
        rightLeafRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 border-t bg-white overflow-x-clip z-20"
    >
      {/* Decorative Leaves */}
      <img
        ref={leftLeafRef}
        src={leaf5}
        alt="Decorative Leaf"
        className="pointer-events-none absolute left-0 bottom-0 w-28 sm:w-32 md:w-48 lg:w-64 z-10 translate-y-1/3 -translate-x-1/4 drop-shadow-2xl"
      />
      <img
        ref={rightLeafRef}
        src={leaf6}
        alt="Decorative Spices"
        className="pointer-events-none absolute right-0 bottom-0 w-32 sm:w-40 md:w-56 lg:w-80 z-10 translate-y-[20%] translate-x-1/4 drop-shadow-2xl"
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Column: Info */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="contact-element mb-3 sm:mb-4 flex items-center gap-2 rounded-full border border-[#145eb5]/30 bg-[#145eb5]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]"></span>
              CONTACT US
            </div>

            <h2 className="contact-element mb-3 sm:mb-4 text-3xl sm:text-[36px] font-extrabold tracking-tight text-navy-900 lg:text-[44px]">
              Get in Touch
            </h2>

            <p className="contact-element text-[14px] sm:text-[15px] font-medium leading-[1.6] text-muted-500 mb-6 sm:mb-8 max-w-md">
              We'd love to hear from you. Reach out to us for any queries,
              suggestions or support.
            </p>

            <div className="contact-element flex flex-col sm:flex-row gap-3 mb-6">
              {/* Card 1 */}
              <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-row sm:flex-col xl:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#145eb5] text-white">
                  <Phone className="h-5 w-5" fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-navy-900 mb-0.5 sm:mb-1">
                    Call Us
                  </h4>
                  {company.phones.map((phone) => (
                    <p
                      key={phone}
                      className="text-[12px] text-muted-500 font-medium whitespace-nowrap"
                    >
                      {formatIndianMobile(phone)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-row sm:flex-col xl:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#145eb5] text-white">
                  <Mail className="h-5 w-5" fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-navy-900 mb-0.5 sm:mb-1">
                    Email Us
                  </h4>
                  <p className="text-[12px] text-muted-500 font-medium break-all">
                    {company.email}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-row sm:flex-col xl:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#145eb5] text-white">
                  <MapPin className="h-5 w-5" fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-navy-900 mb-0.5 sm:mb-1">
                    Our Office
                  </h4>
                  <p className="text-[12px] text-muted-500 font-medium">
                    {company.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-element w-full lg:w-[40%]">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>

              <form className="relative z-10 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-[#145eb5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#145eb5]/10 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-[#145eb5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#145eb5]/10 transition-all"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-[#145eb5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#145eb5]/10 transition-all"
                />

                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-[#145eb5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#145eb5]/10 transition-all"
                ></textarea>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#145eb5] px-8 py-3.5 font-bold text-white transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#145eb5]/30 w-full sm:w-auto"
                  >
                    <span className="relative z-10">Send Message</span>
                    <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
