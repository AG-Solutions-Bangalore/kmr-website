/**
 * Company module — shared types for GET /getCompany.
 * Field names match the CRM API response exactly.
 */

/** Raw company row as returned by `GET /getCompany` (`data` key). */
export interface CompanyApiItem {
  id?: number | string;
  company_name?: string;
  company_email?: string;
  company_short?: string;
  company_gst?: string | null;
  company_pan_no?: string | null;
  company_mobile_no?: string | null;
  company_mobile_no2?: string | null;
  company_landline_no?: string | null;
  company_address?: string;
  company_map_url?: string | null;
  company_place?: string;
  company_logo?: string;
  company_having_email?: number;
  company_status?: string;
  [key: string]: unknown;
}

/** UI-ready company info (normalized, never null fields). */
export interface Company {
  name: string;
  shortName: string;
  email: string;
  /** Raw digit strings, e.g. ["9092346999"] — format with formatIndianMobile(). */
  phones: string[];
  landline: string;
  address: string;
  place: string;
  /** Raw map URL from API (may be null) — resolve with companyMapEmbedUrl(). */
  mapUrl: string | null;
  logo: string;
}

export interface GetCompanyResponse {
  data?: CompanyApiItem | null;
  image_url?: Array<{ image_for?: string; image_url?: string }>;
  [key: string]: unknown;
}
