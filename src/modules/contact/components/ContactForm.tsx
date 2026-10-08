import { useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { useCreateEnquiry } from '../hook/useContact';
import { ENQUIRY_SERVICES } from '../types';
import { getApiErrorMessage } from '@/lib/api';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-primary-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-600/10 transition-all disabled:opacity-60';
const labelClass = 'mb-1.5 block text-[13px] font-bold text-navy-800';
const errorClass = 'mt-1 text-[12px] font-medium text-danger-600';

function getUtmParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_medium: params.get('utm_medium') ?? '',
    utm_source: params.get('utm_source') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
  };
}

export function ContactForm() {
  const enquiry = useCreateEnquiry();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<string>(ENQUIRY_SERVICES[0]);
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const utm = useMemo(() => getUtmParams(), []);
  const successMessage = useMemo(() => {
    const data = enquiry.data as { message?: string; msg?: string } | undefined;
    return data?.message ?? data?.msg ?? 'Thank you! Your enquiry has been submitted. Our team will reach out shortly.';
  }, [enquiry.data]);

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(mobile.replace(/\s/g, '')))
      errors.mobile = 'Enter a valid 10-digit mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = 'Enter a valid email address.';
    if (!service) errors.service = 'Please choose a service.';
    if (message.trim().length < 5) errors.message = 'Please tell us a little more (min 5 characters).';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (enquiry.isPending) return;
    if (!validate()) return;
    enquiry.mutate(
      {
        enquiryFullName: fullName.trim(),
        enquiryMobile: mobile.trim(),
        enquiryEmail: email.trim(),
        enquiryService: service,
        enquiryMessage: message.trim(),
        enquiryFrom:
          typeof window !== 'undefined' ? window.location.href : 'website-contact-page',
        ...utm,
      },
      {
        onSuccess: () => {
          setFullName('');
          setMobile('');
          setEmail('');
          setService(ENQUIRY_SERVICES[0]);
          setMessage('');
          setFieldErrors({});
        },
      },
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_20px_50px_rgb(0,0,0,0.08)] sm:rounded-3xl sm:p-8 md:p-10">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-primary-50 rounded-full blur-3xl opacity-60 z-0" />

      {enquiry.isSuccess ? (
        <div className="relative z-10 flex flex-col items-center py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-navy-900">Enquiry sent!</h3>
          <p className="mt-2 max-w-sm text-[14px] font-medium leading-relaxed text-muted-500">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => enquiry.reset()}
            className="mt-6 rounded-xl border border-gray-200 px-6 py-2.5 text-[13px] font-bold text-navy-800 hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="enquiry-name" className={labelClass}>
                Full Name *
              </label>
              <input
                id="enquiry-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={enquiry.isPending}
                className={inputClass}
              />
              {fieldErrors.fullName && <p className={errorClass}>{fieldErrors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="enquiry-mobile" className={labelClass}>
                Mobile Number *
              </label>
              <input
                id="enquiry-mobile"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile"
                autoComplete="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                disabled={enquiry.isPending}
                className={inputClass}
              />
              {fieldErrors.mobile && <p className={errorClass}>{fieldErrors.mobile}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="enquiry-email" className={labelClass}>
              Email Address *
            </label>
            <input
              id="enquiry-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={enquiry.isPending}
              className={inputClass}
            />
            {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="enquiry-service" className={labelClass}>
              Service Interested In *
            </label>
            <select
              id="enquiry-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={enquiry.isPending}
              className={inputClass}
            >
              {ENQUIRY_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {fieldErrors.service && <p className={errorClass}>{fieldErrors.service}</p>}
          </div>

          <div>
            <label htmlFor="enquiry-message" className={labelClass}>
              Your Message *
            </label>
            <textarea
              id="enquiry-message"
              rows={4}
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={enquiry.isPending}
              className={`${inputClass} resize-none`}
            />
            {fieldErrors.message && <p className={errorClass}>{fieldErrors.message}</p>}
          </div>

          {enquiry.isError && (
            <p className="flex items-start gap-2 rounded-xl bg-danger-50 px-4 py-3 text-[13px] font-semibold text-danger-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {getApiErrorMessage(enquiry.error)}
            </p>
          )}

          <div className="mt-1 flex justify-end">
            <button
              type="submit"
              disabled={enquiry.isPending}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary-600 px-8 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
            >
              {enquiry.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="relative z-10">Sending…</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
