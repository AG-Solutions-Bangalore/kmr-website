/**
 * Contact module — shared types for Enquiry + Newsletter APIs.
 * Field names must match the Postman collection exactly (form-data keys).
 */

export interface CreateEnquiryPayload {
  /** Full name of the person enquiring (required) */
  enquiryFullName: string;
  /** 10-digit mobile number (required) */
  enquiryMobile: string;
  /** Email address (required) */
  enquiryEmail: string;
  /** Service / subject the user is interested in */
  enquiryService?: string;
  /** Free-text message */
  enquiryMessage?: string;
  /** Where the enquiry originated, e.g. page URL or "website-contact-page" */
  enquiryFrom?: string;
  utm_medium?: string;
  utm_source?: string;
  utm_campaign?: string;
}

export interface CreateNewsletterPayload {
  newsletter_email: string;
}

/** Generic shape returned by the CRM API (kept permissive — backend varies). */
export interface CrmApiResponse<T = unknown> {
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  msg?: string;
  data?: T;
  [key: string]: unknown;
}

export interface EnquiryFormValues {
  fullName: string;
  mobile: string;
  email: string;
  service: string;
  message: string;
}

export const ENQUIRY_SERVICES = [
  'General Enquiry',
  'Edible Oil',
  'Spices',
  'Pulses',
  'Dry Fruits',
  'Subscription / App Support',
  'Partnership',
  'Other',
] as const;
