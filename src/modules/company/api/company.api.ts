import { apiClient } from '@/lib/api';
import type { Company, CompanyApiItem, GetCompanyResponse } from '../types';

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

/**
 * Last-known-good company info (matches GET /getCompany).
 * Used as fallback while loading / when the API is unreachable —
 * callers always render something real, never empty cards.
 */
export const COMPANY_FALLBACK: Company = {
  name: 'KMR Live',
  shortName: 'KMRL',
  email: 'info@kmrlive.in',
  phones: ['9092346999', '9042028585'],
  landline: '',
  address: '12 Lakshmaih Layout Abbigere Bangalore 560090 India',
  place: 'Bangalore',
  mapUrl: null,
  logo: '',
};

/** Normalize one raw API row into UI-ready shape. */
export function normalizeCompanyItem(item: CompanyApiItem | null | undefined): Company {
  const phones = [
    firstString(item?.company_mobile_no),
    firstString(item?.company_mobile_no2),
  ].filter(Boolean);

  return {
    name: firstString(item?.company_name) || COMPANY_FALLBACK.name,
    shortName: firstString(item?.company_short) || COMPANY_FALLBACK.shortName,
    email: firstString(item?.company_email) || COMPANY_FALLBACK.email,
    phones: phones.length > 0 ? phones : COMPANY_FALLBACK.phones,
    landline: firstString(item?.company_landline_no),
    address: firstString(item?.company_address) || COMPANY_FALLBACK.address,
    place: firstString(item?.company_place) || COMPANY_FALLBACK.place,
    mapUrl: firstString(item?.company_map_url) || null,
    logo: firstString(item?.company_logo),
  };
}

/**
 * GET /getCompany — company profile (name, phones, email, address, map URL).
 * Always resolves to a usable Company (falls back to last-known-good data
 * when the API is down), so callers can render directly.
 */
export async function getCompany(): Promise<Company> {
  const { data } = await apiClient.get<GetCompanyResponse>('/getCompany');
  const item = data?.data;
  if (!item || typeof item !== 'object') return COMPANY_FALLBACK;
  return normalizeCompanyItem(item);
}

/** "9092346999" -> "+91 90923 46999" (passes through already-formatted values). */
export function formatIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  if (/^\d{10}$/.test(digits)) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return raw;
}

/** "9092346999" -> "+919092346999" for `tel:` links. */
export function indianMobileTelHref(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (/^\d{10}$/.test(digits)) return `+91${digits}`;
  if (/^91\d{10}$/.test(digits)) return `+${digits}`;
  return raw;
}

/**
 * Resolve the Google Maps embed `src` for the company.
 * - Prefers `company_map_url` when the API provides an embeddable maps URL.
 * - Otherwise geocodes the real company address via a keyless embed query.
 */
export function companyMapEmbedUrl(company: Pick<Company, 'address' | 'mapUrl' | 'place'>): string {
  const mapUrl = (company.mapUrl ?? '').trim();
  if (/google\.[^/]+\/maps/i.test(mapUrl) || /output=embed/.test(mapUrl)) {
    return mapUrl;
  }
  const query = company.address || company.place || 'Bangalore, India';
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export const companyApi = {
  getCompany,
  companyMapEmbedUrl,
  formatIndianMobile,
  indianMobileTelHref,
};
