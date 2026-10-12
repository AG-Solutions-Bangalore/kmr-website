import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  useCompany,
  formatIndianMobile,
  indianMobileTelHref,
  COMPANY_FALLBACK,
} from '@/modules/company';

/**
 * Contact info cards — phone / email / address come live from
 * GET /getCompany (falls back to last-known-good data while loading).
 * Working hours are static (no API field exists for them).
 */
export function ContactInfo() {
  const { data: company = COMPANY_FALLBACK } = useCompany();

  const cards = [
    {
      icon: Phone,
      title: 'Call Us',
      content: company.phones.map((phone) => (
        <a
          key={phone}
          href={`tel:${indianMobileTelHref(phone)}`}
          title={`Call KMR LIVE Support: ${formatIndianMobile(phone)}`}
          aria-label={`Call KMR LIVE Support: ${formatIndianMobile(phone)}`}
          className="block text-[12px] font-medium text-muted-500 hover:text-primary-600 transition-colors whitespace-nowrap"
        >
          {formatIndianMobile(phone)}
        </a>
      )),
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: (
        <a
          href={`mailto:${company.email}`}
          title="Email KMR LIVE Support"
          aria-label="Email KMR LIVE Support"
          className="block text-[12px] font-medium text-muted-500 hover:text-primary-600 transition-colors break-all"
        >
          {company.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      title: 'Our Office',
      content: (
        <span className="block text-[12px] font-medium text-muted-500">
          {company.address}
        </span>
      ),
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: (
        <>
          <span className="block text-[12px] font-medium text-muted-500">
            Mon – Sat: 9:00 AM – 7:00 PM
          </span>
          <span className="block text-[12px] font-medium text-muted-500">
            Sunday: Closed
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map(({ icon: Icon, title, content }) => (
        <div
          key={title}
          className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="mb-1 block text-[14px] font-bold text-navy-900">{title}</span>
            {content}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
