import { Link } from "react-router";
import { ChevronRight, Phone, Mail, MapPin, Building2 } from "lucide-react";
import {
  useCompany,
  formatIndianMobile,
  indianMobileTelHref,
  COMPANY_FALLBACK,
} from "@/modules/company";
import { webImage } from "@/lib/web-images";

/**
 * /about — company profile, live from GET /getCompany.
 * Name, phones, email and address render from the API (with
 * last-known-good fallback while loading), never hardcoded.
 */
export function AboutPage() {
  const { data: company = COMPANY_FALLBACK } = useCompany();

  const profileCards = [
    {
      icon: Phone,
      title: "Call Us",
      body: company.phones.map((phone) => (
        <a
          key={phone}
          href={`tel:${indianMobileTelHref(phone)}`}
          className="block text-[14px] font-medium text-muted-500 transition-colors hover:text-primary-600"
        >
          {formatIndianMobile(phone)}
        </a>
      )),
    },
    {
      icon: Mail,
      title: "Email Us",
      body: (
        <a
          href={`mailto:${company.email}`}
          className="block break-all text-[14px] font-medium text-muted-500 transition-colors hover:text-primary-600"
        >
          {company.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      title: "Our Office",
      body: (
        <span className="block text-[14px] font-medium leading-relaxed text-muted-500">
          {company.address}
        </span>
      ),
    },
    {
      icon: Building2,
      title: "Company",
      body: (
        <>
          <span className="block text-[14px] font-bold text-navy-900">
            {company.name}
            {company.shortName ? ` (${company.shortName})` : ""}
          </span>
          <span className="block text-[14px] font-medium text-muted-500">
            {company.place}, India
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Breadcrumb hero */}
      <section className="relative overflow-hidden bg-mist-100">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-success-100 blur-3xl opacity-50" />
        <div className="container relative py-10 sm:py-14">
          <nav className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-500">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary-600">About Us</span>
          </nav>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Your Trusted Partner in <br /> Commodity Market Information
          </h1>
          <p className="mt-3 max-w-xl text-[14px] font-medium leading-relaxed text-muted-500 sm:text-[15px]">
            {company.name} provides real-time commodity market information,
            trends and insights to help traders, businesses and individuals make
            smarter decisions.
          </p>
        </div>
      </section>

      {/* Our story — brand history from kmrlive.in */}
      <section className="relative w-full overflow-hidden py-10 sm:py-14">
        <div className="container">
          <div className="flex flex-col items-start gap-10 lg:min-h-[540px] lg:flex-row lg:items-center lg:gap-14">
            {/* Left: copy */}
            <div className="w-full lg:w-[55%]">
              <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                Our Story
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
                Karnataka Market Reports — a trusted name in commodity reporting
              </h2>
              <div className="mt-4 grid gap-4 text-[14px] font-medium leading-[1.7] text-muted-500 sm:text-[15px]">
                <p>
                  Karnataka Market Reports (KMR) is a well known brand name in
                  commodities reporting in India. From a humble start as area
                  reporting over WhatsApp, it has grown into a large
                  organisation with the support of its pursuers and readers —
                  reporting in Edible Oils, Coconuts, Coconut Oils, Copra,
                  Pulses, Spices, Provisions and Cashew. It is the first of its
                  kind in South India.
                </p>
                <p>
                  Our reports serve the trading community in many ways. Today,
                  manufacturers, retailers, dealers, companies and wholesalers
                  count among our satisfied customers. KMR forms the link
                  between manufacturers, wholesalers, distributors and retailers
                  — its wide reach and readership also help manufacturers and
                  brands advertise and publish their brand rates.
                </p>
              </div>

              {/* Coverage chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Edible Oils",
                  "Coconuts",
                  "Coconut Oils",
                  "Copra",
                  "Pulses",
                  "Spices",
                  "Provisions",
                  "Cashew",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary-600/20 bg-primary-600/5 px-3.5 py-1.5 text-[12px] font-bold text-navy-900"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: image bleeding to the right edge (same as home) */}
            <div className="relative mx-auto w-full max-w-[520px] -mt-3.5 lg:absolute lg:bottom-0 lg:right-0 lg:top-0 lg:mx-0 lg:w-[42%] lg:max-w-none">
              <div className="h-full overflow-hidden rounded-3xl lg:rounded-l-[2rem] lg:rounded-r-none lg:border-r-0">
                <img
                  src={webImage("home/hero_abou-use_image.webp")}
                  alt="KMR commodity market"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square h-auto max-h-[560px] w-full object-cover lg:aspect-auto lg:h-full lg:max-h-none"
                />
              </div>
              <div className="absolute bottom-4 left-4 rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-[0_12px_30px_rgb(0,0,0,0.10)] sm:left-6 lg:left-8">
                <p className="text-xl font-extrabold tracking-tight text-primary-600">
                  #1
                </p>
                <p className="max-w-[160px] text-[11px] font-bold leading-snug text-navy-900">
                  First of its kind in South India
                </p>
              </div>
              <div className="absolute right-4 top-4 rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-[0_12px_30px_rgb(0,0,0,0.10)] sm:right-6">
                <p className="text-xl font-extrabold tracking-tight text-primary-600">
                  75%
                </p>
                <p className="text-[11px] font-bold leading-snug text-navy-900">
                  Happy users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company profile */}
      <section className="container pb-10 sm:pb-14">
        <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
          About Us
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
          {company.name}
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] font-medium leading-[1.6] text-muted-500">
          Reach us directly on any of the channels below — our team typically
          replies within one business day.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profileCards.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="mb-1 block text-[14px] font-bold text-navy-900">
                  {title}
                </span>
                {body}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutPage;
