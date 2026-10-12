import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_AUTHOR,
  SITE_PUBLISHER,
  SITE_ORIGIN,
  getCanonicalUrl,
  createCompositeGraph,
  organizationSchema,
} from './schemas';

export { SITE_NAME, SITE_AUTHOR, SITE_PUBLISHER, SITE_ORIGIN, getCanonicalUrl };

export interface SeoRouteConfig {
  title: string;
  description: string;
  keywords: string;
  path: string;
}

export const SEO_CONFIG = {
  home: {
    title: `${SITE_NAME} — Market Trends, Real Insights, Smarter Decisions`,
    description:
      `${SITE_NAME} provides the latest market trends, real-time insights, and valuable updates to keep you informed and help you make smarter, more confident decisions.`,
    keywords:
      `${SITE_NAME}, Karnataka Market Reports, commodity market trends, live commodity prices, mandi rates Karnataka, edible oil prices, pulses rates India, agricultural commodity prices, business intelligence`,
    path: '/',
  },
  about: {
    title: `About Us | ${SITE_NAME} — Karnataka Market Reports`,
    description:
      `Learn about ${SITE_NAME}, a platform connecting users with market trends, product categories, and valuable insights to support informed business decisions every day.`,
    keywords:
      `about ${SITE_NAME}, Karnataka Market Reports history, commodity intelligence platform, Bangalore commodity market, agro commodity trade India`,
    path: '/about',
  },
  contact: {
    title: `Contact Us | ${SITE_NAME} — Get in Touch`,
    description:
      `Contact ${SITE_NAME} for assistance, enquiries, and support. Connect with our team to learn more about market trends, product categories, and our services.`,
    keywords:
      `contact ${SITE_NAME}, ${SITE_NAME} phone number, ${SITE_NAME} email, customer support, Karnataka Market Reports office Bangalore, trade enquiries`,
    path: '/contact',
  },
  blog: {
    title: `Stories & Market Insights | ${SITE_NAME} Blog`,
    description:
      `Expert analysis, price trends and stories from India’s commodity markets — written by the ${SITE_NAME} team.`,
    keywords:
      `${SITE_NAME} blog, market insights, commodity price analysis, agriculture news India, daily mandi trends, wholesale market updates`,
    path: '/blog',
  },
} satisfies Record<string, SeoRouteConfig>;

export type SeoKey = keyof typeof SEO_CONFIG;

export interface SeoOverride {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
}

export interface HeadState {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

export function headOf(key: SeoKey, override?: SeoOverride): HeadState {
  const cfg = SEO_CONFIG[key];
  const title = override?.title || cfg.title;
  const description = override?.description || cfg.description;
  const keywords = override?.keywords || cfg.keywords;
  const path = override?.path || cfg.path;
  return { title, description, keywords, canonical: getCanonicalUrl(path) };
}

export function resolveSeoForPath(pathname: string, override?: SeoOverride): HeadState {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (clean === '/') return headOf('home', override);
  if (clean === '/about') return headOf('about', override);
  if (clean === '/contact') return headOf('contact', override);
  if (clean === '/blog') return headOf('blog', override);
  if (clean.startsWith('/blog/')) {
    return headOf('blog', { path: clean, ...override });
  }
  return headOf('home', override);
}

/**
 * Direct DOM synchronization function.
 * Updates the document title, canonical link, meta description, keywords, and social tags.
 * Ensures any pre-existing or duplicate tags from SSG are updated in-place and cleaned up.
 */
export function syncHeadToDom(head: HeadState): void {
  if (typeof document === 'undefined') return;

  // 1. Update document title
  document.title = head.title;

  // Helper to upsert a meta element and remove any duplicate tags
  const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
    const list = document.querySelectorAll(`meta[${attr}="${key}"]`);
    if (list.length > 0) {
      list[0].setAttribute('content', content);
      for (let i = 1; i < list.length; i++) {
        list[i].remove();
      }
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, key);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };

  // 2. Canonical Link — guarantee first tag is updated and any stale duplicates are pruned
  const canonicals = document.querySelectorAll('link[rel="canonical"]');
  if (canonicals.length > 0) {
    canonicals[0].setAttribute('href', head.canonical);
    for (let i = 1; i < canonicals.length; i++) {
      canonicals[i].remove();
    }
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', head.canonical);
    document.head.appendChild(link);
  }

  // 3. Description, Keywords, Robots, Author, Publisher
  upsertMeta('name', 'description', head.description);
  if (head.keywords) {
    upsertMeta('name', 'keywords', head.keywords);
  }
  upsertMeta('name', 'robots', 'index, follow');
  upsertMeta('name', 'author', SITE_AUTHOR);
  upsertMeta('name', 'publisher', SITE_PUBLISHER);

  // 4. OpenGraph
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:title', head.title);
  upsertMeta('property', 'og:description', head.description);
  upsertMeta('property', 'og:url', head.canonical);

  // 5. Twitter Card
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', head.title);
  upsertMeta('name', 'twitter:description', head.description);
}

let currentHead: HeadState =
  typeof window !== 'undefined'
    ? resolveSeoForPath(window.location.pathname)
    : headOf('home');

const headListeners = new Set<(head: HeadState) => void>();

export function updateSeoForPath(pathname: string, override?: SeoOverride): void {
  currentHead = resolveSeoForPath(pathname, override);
  syncHeadToDom(currentHead);
  headListeners.forEach((listener) => listener(currentHead));
}

/**
 * Global initialization called in main.tsx.
 * Ensures the initial page load synchronizes the DOM head immediately
 * and back/forward browser history updates the head tags.
 */
export function initRouteSeoSync(): void {
  if (typeof window === 'undefined') return;

  // Sync head on boot
  updateSeoForPath(window.location.pathname);

  // Sync on browser history popstate (back / forward buttons)
  window.addEventListener('popstate', () => {
    updateSeoForPath(window.location.pathname);
  });
}

/**
 * Optional override hook for dynamic routes (e.g., individual blog post pages).
 * Standard pages (/ , /about, /contact, /blog) do NOT need to call this.
 */
export function useSEO(key?: SeoKey, override?: SeoOverride): void {
  const title = override?.title;
  const description = override?.description;
  const keywords = override?.keywords;
  const path = override?.path;
  useEffect(() => {
    if (!key && !override) return;
    currentHead = key
      ? headOf(key, { title, description, keywords, path })
      : resolveSeoForPath(window.location.pathname, { title, description, keywords, path });
    syncHeadToDom(currentHead);
    headListeners.forEach((listener) => listener(currentHead));
  }, [key, title, description, keywords, path]);
}

/**
 * Single centralized SEO component.
 * Automatically manages page title, meta description, canonical, author, publisher, and OG tags
 * across all routes.
 */
export function AutoSeo() {
  const [head, setHead] = useState<HeadState>(currentHead);

  useEffect(() => {
    headListeners.add(setHead);

    const onLocationChange = () => {
      const nextHead = resolveSeoForPath(window.location.pathname);
      currentHead = nextHead;
      syncHeadToDom(nextHead);
      setHead(nextHead);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      headListeners.delete(setHead);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <Helmet>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      {head.keywords ? <meta name="keywords" content={head.keywords} /> : null}
      <link rel="canonical" href={head.canonical} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={SITE_AUTHOR} />
      <meta name="publisher" content={SITE_PUBLISHER} />
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

export const SeoHost = AutoSeo;

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
