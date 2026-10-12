import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_ORIGIN,
  getCanonicalUrl,
  createCompositeGraph,
  organizationSchema,
} from './schemas';

export { SITE_NAME, SITE_ORIGIN, getCanonicalUrl };

export interface SeoRouteConfig {
  title: string;
  description: string;
  path: string;
}

export const SEO_CONFIG = {
  home: {
    title: 'KMR LIVE — Market Trends, Real Insights, Smarter Decisions',
    description:
      'KMR LIVE (Karnataka Market Reports) brings real-time commodity market information, price trends and insights on edible oils, coconuts, pulses, spices and more.',
    path: '/',
  },
  about: {
    title: 'About Us | KMR LIVE — Karnataka Market Reports',
    description:
      'Karnataka Market Reports (KMR) is a trusted name in commodity reporting in India — covering edible oils, coconuts, copra, pulses, spices, provisions and cashew.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us | KMR LIVE — Get in Touch',
    description:
      'Questions about prices, subscriptions or partnerships? Contact the KMR LIVE team — we typically reply within one business day.',
    path: '/contact',
  },
  blog: {
    title: 'Stories & Market Insights | KMR LIVE Blog',
    description:
      'Expert analysis, price trends and stories from India’s commodity markets — written by the KMR LIVE team.',
    path: '/blog',
  },
} satisfies Record<string, SeoRouteConfig>;

export type SeoKey = keyof typeof SEO_CONFIG;

export interface SeoOverride {
  title?: string;
  description?: string;
  path?: string;
}

interface HeadState {
  title: string;
  description: string;
  canonical: string;
}

function headOf(key: SeoKey, override?: SeoOverride): HeadState {
  const cfg = SEO_CONFIG[key];
  const title = override?.title || cfg.title;
  const description = override?.description || cfg.description;
  const path = override?.path || cfg.path;
  return { title, description, canonical: getCanonicalUrl(path) };
}

let currentHead: HeadState = headOf('home');
const headListeners = new Set<(head: HeadState) => void>();

export function useSEO(key: SeoKey, override?: SeoOverride): void {
  const title = override?.title;
  const description = override?.description;
  const path = override?.path;
  useEffect(() => {
    currentHead = headOf(key, { title, description, path });
    headListeners.forEach((listener) => listener(currentHead));
  }, [key, title, description, path]);
}

export function SeoHost() {
  const [head, setHead] = useState<HeadState>(currentHead);

  useEffect(() => {
    headListeners.add(setHead);
    return () => {
      headListeners.delete(setHead);
    };
  }, []);

  return (
    <Helmet>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <link rel="canonical" href={head.canonical} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:url" content={head.canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title} />
      <meta name="twitter:description" content={head.description} />
    </Helmet>
  );
}

/** Fallback JSON-LD for client-only visits when SSG output is bypassed. */
export function injectOrganizationSchema(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('kmr-rich-results')) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'kmr-rich-results';
  script.text = JSON.stringify(createCompositeGraph([organizationSchema()]));
  document.head.appendChild(script);
}
