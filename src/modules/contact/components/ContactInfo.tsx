import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useCompany, formatIndianMobile, COMPANY_FALLBACK } from '@/modules/company';

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
      lines: company.phones.map(formatIndianMobile),
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [company.email],
    },
    {
      icon: MapPin,
      title: 'Our Office',
      lines: [company.address],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map(({ icon: Icon, title, lines }) => (
        <div
          key={title}
          className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-[14px] font-bold text-navy-900">{title}</span>
            {lines.map((line) => (
              <span key={line} className="block text-[12px] font-medium text-muted-500">
                {line}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
