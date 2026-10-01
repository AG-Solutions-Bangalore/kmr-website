import type { Faq } from '../types';

/**
 * Static fallback FAQs for the home page, shown until the CRM API
 * returns rows for the `home` slug. Kept in the faq module so the
 * global FaqSection can render them without page-level wiring.
 */
export const HOME_FALLBACK_FAQS: Faq[] = [
  {
    id: 'fallback-1',
    question: 'What is KMR LIVE?',
    answer:
      'KMR LIVE provides real-time commodity market information, trends and insights to help traders, businesses and individuals make informed decisions.',
  },
  {
    id: 'fallback-2',
    question: 'How often is the market data updated?',
    answer:
      'Our market data is updated in real-time throughout the trading day to ensure you always have the most current information at your fingertips.',
  },
  {
    id: 'fallback-3',
    question: 'Which commodities are covered?',
    answer:
      'We cover a wide range of agricultural and non-agricultural commodities including grains, edible oils, pulses, spices, and more across major markets.',
  },
  {
    id: 'fallback-4',
    question: 'Is the KMR LIVE app free to use?',
    answer:
      'KMR LIVE offers a basic free tier with limited access, along with premium subscription plans that unlock advanced features, historical data, and deep market analysis.',
  },
];
