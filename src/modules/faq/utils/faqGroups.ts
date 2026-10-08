/**
 * Shared FAQ helpers — imported by every FAQ render site
 * (global {@link FaqSection}, blog detail page) so heading
 * grouping + manual ordering behave identically everywhere.
 */

/** Minimal shape any FAQ-like item must satisfy for grouping/sorting. */
export interface FaqLike {
  heading?: string;
  faq_sort?: string | number;
  sort?: string | number;
  order?: string | number;
}

export interface FaqGroup<T> {
  /** Group label (`""` when the API provides no heading). */
  heading: string;
  items: T[];
}

/**
 * Group FAQs by their `heading`, preserving first-appearance order.
 * Items without a heading land in a `""` group (rendered without a label).
 */
export function groupFaqsByHeading<T extends FaqLike>(faqs: T[]): FaqGroup<T>[] {
  const map = new Map<string, T[]>();
  for (const faq of faqs) {
    const key = (faq.heading ?? '').trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(faq);
  }
  return [...map.entries()].map(([heading, items]) => ({ heading, items }));
}

/**
 * `true` when heading labels should render — i.e. FAQs actually span
 * multiple groups. A single group renders flat, exactly like before.
 */
export function shouldShowFaqHeadings<T extends FaqLike>(faqs: T[]): boolean {
  return groupFaqsByHeading(faqs).length > 1;
}

/** Numeric `faq_sort` value for ordering; unsorted rows sink to the end. */
export function faqSortValue(item: FaqLike | null | undefined): number {
  const raw = item?.faq_sort ?? item?.sort ?? item?.order;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw ?? ''));
  return Number.isFinite(n) ? (n as number) : Number.MAX_SAFE_INTEGER;
}

/**
 * Stable sort by `faq_sort` (ascending). Rows without a sort value keep
 * their relative API order at the end. Pure — returns a new array.
 */
export function sortFaqsBySortValue<T extends FaqLike>(faqs: T[]): T[] {
  return faqs
    .map((faq, index) => ({ faq, index }))
    .sort((a, b) => faqSortValue(a.faq) - faqSortValue(b.faq) || a.index - b.index)
    .map(({ faq }) => faq);
}
