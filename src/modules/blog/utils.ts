/** Shared presentation helpers for the blog module. */

/** Strip HTML tags + decode common entities for word counts / previews. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rough read-time estimate (~200 words per minute), minimum 1 minute. Accepts plain text or HTML. */
export function getReadTimeMinutes(text: string): number {
  const clean = text.includes('<') ? stripHtml(text) : text;
  if (!clean.trim()) return 1;
  const words = clean.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Initials for avatar fallbacks, e.g. "Surya" → "S", "KMR Live" → "KL". */
export function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return initials || 'K';
}
