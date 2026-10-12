import type {
  AggregateRating,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  ItemList,
  Organization,
  Review,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";

export const SITE_ORIGIN = "https://kmrlive.in";
export const SITE_NAME = "KMR LIVE";
export const SITE_LOGO = `${SITE_ORIGIN}/logo.webp`;

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function stripHtml(value: unknown): string {
  return typeof value === "string"
    ? value
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

export function getCanonicalUrl(pathname: string): string {
  const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `${SITE_ORIGIN}/${clean}` : `${SITE_ORIGIN}/`;
}

export function toIsoDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) return raw;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  if (!match) {
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  return `${match[1]}-${match[2]}-${match[3]}T00:00:00+05:30`;
}

interface AggregateInput {
  ratingValue: number;
  reviewCount: number;
}

export function organizationSchema(
  aggregate?: AggregateInput,
  reviews?: Review[],
): Organization {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Karnataka Market Reports",
    url: `${SITE_ORIGIN}/`,
    logo: SITE_LOGO,
    description:
      "KMR LIVE (Karnataka Market Reports) provides real-time commodity market information, price trends and insights on edible oils, coconuts, pulses, spices, provisions and cashew across India.",
    email: "info@kmrlive.in",
    telephone: ["+91-9092346999", "+91-9042028585"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Lakshmaih Layout, Abbigere",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560090",
      addressCountry: "IN",
    },
    ...(aggregate && aggregate.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregate.ratingValue,
            reviewCount: aggregate.reviewCount,
            bestRating: 5,
          } satisfies AggregateRating,
        }
      : {}),
    ...(reviews && reviews.length > 0 ? { review: reviews } : {}),
  };
}

export function websiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema(
  path: string,
  title: string,
  description: string,
): WebPage {
  return {
    "@type": "WebPage",
    url: getCanonicalUrl(path),
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export interface FaqRowInput {
  question?: unknown;
  answer?: unknown;
  faq_que?: unknown;
  faq_ans?: unknown;
  faq_question?: unknown;
  faq_answer?: unknown;
  title?: unknown;
  content?: unknown;
  description?: unknown;
}

export function faqPageSchema(rows: FaqRowInput[]): FAQPage | null {
  const usable = (rows ?? [])
    .map((row) => ({
      question: stripHtml(
        row.question ?? row.faq_que ?? row.faq_question ?? row.title,
      ),
      answer: stripHtml(
        row.answer ??
          row.faq_ans ??
          row.faq_answer ??
          row.content ??
          row.description,
      ),
    }))
    .filter((row) => row.question.length > 0 && row.answer.length > 0);
  if (usable.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: usable.map((row) => ({
      "@type": "Question",
      name: row.question,
      acceptedAnswer: { "@type": "Answer", text: row.answer },
    })),
  };
}

export interface BlogPostingInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: unknown;
  author?: string;
}

export function blogPostingSchema(post: BlogPostingInput): BlogPosting {
  const url = getCanonicalUrl(`/blog/${post.slug}`);
  const datePublished = toIsoDate(post.datePublished) ?? undefined;
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    url,
    mainEntityOfPage: url,
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Organization",
      name: post.author || SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: SITE_LOGO,
    },
  };
}

export interface ReviewInput {
  name: string;
  body: string;
  rating: number;
  datePublished?: unknown;
}

export function reviewSchema(review: ReviewInput): Review {
  const datePublished = toIsoDate(review.datePublished) ?? undefined;
  return {
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    reviewBody: review.body,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    ...(datePublished ? { datePublished } : {}),
    itemReviewed: { "@id": ORG_ID },
  };
}

export function itemListSchema(
  items: { name: string; path: string }[],
): ItemList {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function createCompositeGraph(nodes: Thing[]): Record<string, unknown> {
  return { "@context": "https://schema.org", "@graph": nodes };
}
