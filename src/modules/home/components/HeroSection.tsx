import heroBanner from '@/assets/home/hero_banner_with_phone.png';

const TRUST_ITEMS = [
  {
    label: 'Real-Time Prices',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Expert Insights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <circle cx="12" cy="9" r="5.5" />
        <path d="m8.8 13.5-1.6 6 4.8-2.4 4.8 2.4-1.6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Trusted by Traders',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M7 11 4.5 13.5c-.6.6-.6 1.6 0 2.2l2.2 2.2c.6.6 1.6.6 2.2 0L12 14.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m17 11 2.5 2.5c.6.6.6 1.6 0 2.2l-2.2 2.2c-.6.6-1.6.6-2.2 0L12 14.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3.5 9.5 6h5L12 3.5Z" strokeLinejoin="round" />
        <path d="M12 6v8.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Available on Mobile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <rect x="7" y="3" width="10" height="18" rx="2.5" />
        <path d="M10.5 18.5h3" strokeLinecap="round" />
      </svg>
    ),
  },
];




function HeroSection() {
  return (
    <section id="home" style={{ backgroundImage: `url(${heroBanner})` }} className="relative overflow-hidden bg-cover bg-center bg-no-repeat">
      {/* readability overlay — keeps left text legible over the banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-white via-white/85 to-transparent md:w-[75%] lg:w-[60%] lg:from-white lg:via-white/90 lg:to-transparent"
      />
    

      {/* handwritten tagline — right side, like the design */}
      <p
        aria-hidden="true"
        className="absolute right-10 top-10 z-10 hidden -rotate-10 text-right font-script text-3xl font-bold leading-[0.8] drop-shadow-sm md:block lg:right-14 lg:text-4xl xl:right-12"
      >
        From
        <br />
        Markets
        <br />
        to Opportunities
      </p>

      <div className="container relative flex min-h-[90vh] items-center py-14 lg:py-20">
        <div className="max-w-xl">
          {/* eyebrow pill */}
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-600 border border-mist-200">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-success-500" />
            Real Market Information
          </p>

          {/* heading */}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-800 sm:text-5xl lg:text-[3.4rem]">
            Market Trends
            <br />
            Real Insights
            <br />
            <span className="text-primary-500">Smarter Decisions</span>
          </h1>

          {/* subtext */}
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-600">
            Get real-time commodity prices, market trends and expert insights to make informed
            business decisions.
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#categories" className="btn-primary">
              Explore Categories
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
                <path d="M4 12h15m-6-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#app" className="btn-outline">
              Download App
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
                <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* trust icons row */}
          <dl className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col items-start gap-2">
                <dt className="sr-only">{item.label}</dt>
                <span className="text-navy-800">{item.icon}</span>
                <dd className="text-[11px] font-semibold leading-tight text-navy-800">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
