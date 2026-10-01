import { Link } from 'react-router';
import { ChevronRight, MessageCircle, BellRing } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { ContactInfo } from '../components/ContactInfo';
import { NewsletterForm } from '../components/NewsletterForm';

/**
 * /contact — full Contact page.
 * Left: heading + info cards + newsletter. Right: enquiry form (POST /createEnquiry).
 */
export function ContactPage() {
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
            <span className="text-primary-600">Contact Us</span>
          </nav>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Let&apos;s start a conversation
          </h1>
          <p className="mt-3 max-w-xl text-[14px] font-medium leading-relaxed text-muted-500 sm:text-[15px]">
            Questions about prices, subscriptions, or partnerships? Send us a message and
            our team will get back within one business day.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="container py-10 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Left column */}
          <div className="w-full lg:w-[55%]">
            <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
              Contact Us
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-2 max-w-md text-[14px] font-medium leading-[1.6] text-muted-500">
              We&apos;d love to hear from you. Reach out for any queries, suggestions or
              support.
            </p>

            <div className="mt-6">
              <ContactInfo />
            </div>

            {/* Newsletter card */}
            <div className="mt-6 rounded-2xl border border-primary-100 bg-gradient-to-br from-mist-100 to-white p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white">
                  <BellRing className="h-4 w-4" />
                </span>
                <h3 className="text-[15px] font-extrabold text-navy-900">
                  Daily market updates, in your inbox
                </h3>
              </div>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-500">
                Join 10,000+ traders getting price trends and insights every morning.
              </p>
              <NewsletterForm className="mt-4" />
            </div>
          </div>

          {/* Right column — enquiry form */}
          <div className="w-full lg:w-[45%]">
            <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-muted-500">
              <MessageCircle className="h-4 w-4 text-primary-600" />
              Typically replies within 24 hours
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="container pb-12 sm:pb-16">
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <iframe
            title="KMR Live — Bengaluru office map"
            src="https://www.google.com/maps?q=Bengaluru,Karnataka,India&output=embed"
            className="h-[320px] w-full border-0 sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

export default ContactPage;
