import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCreateNewsletter } from '../hook/useContact';
import { getApiErrorMessage } from '@/lib/api';

interface NewsletterFormProps {
  compact?: boolean;
  className?: string;
  /** 'light' for white backgrounds, 'dark' for dark backgrounds like the footer. */
  variant?: 'light' | 'dark';
}

/**
 * Reusable newsletter subscribe form → POST /createNewsletter.
 * Drop it anywhere (contact page, footer, blog sidebar).
 */
export function NewsletterForm({ compact = false, className = '', variant = 'light' }: NewsletterFormProps) {
  const isDark = variant === 'dark';
  const newsletter = useCreateNewsletter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newsletter.isPending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    newsletter.mutate(
      { newsletter_email: email.trim() },
      { onSuccess: () => setEmail('') },
    );
  }

  if (newsletter.isSuccess) {
    return (
      <p
        className={`flex items-center gap-2 text-[13px] font-semibold ${isDark ? 'text-green-300' : 'text-success-600'} ${className}`}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Subscribed! You&apos;ll hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className={`flex gap-2 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email for newsletter"
          disabled={newsletter.isPending}
          className={
            isDark
              ? 'w-full flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[14px] font-medium text-white placeholder:text-blue-200/70 focus:border-white/60 focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all disabled:opacity-60'
              : 'w-full flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-[14px] font-medium text-navy-900 placeholder:text-gray-400 focus:border-primary-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-600/10 transition-all disabled:opacity-60'
          }
        />
        <button
          type="submit"
          disabled={newsletter.isPending}
          className={
            isDark
              ? 'flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-bold text-[#002f6c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-70'
              : 'flex shrink-0 items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:opacity-70'
          }
        >
          {newsletter.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {newsletter.isPending ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {(error || newsletter.isError) && (
        <p
          className={`mt-2 flex items-center gap-1.5 text-[12px] font-medium ${isDark ? 'text-red-300' : 'text-danger-600'}`}
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error || getApiErrorMessage(newsletter.error)}
        </p>
      )}
    </form>
  );
}

export default NewsletterForm;
