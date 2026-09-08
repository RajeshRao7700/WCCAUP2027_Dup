import axios, { AxiosError } from "axios";
import { appConfig } from "@/config/site";

/**
 * Centralised Axios client. The base URL always comes from configuration —
 * never hardcode a backend host inside a service file.
 */
export const axiosClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export class ApiError extends Error {
  status?: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Maps backend/network failures to safe, user-friendly messages. */
export function toApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<{ message?: string }>;
  const status = axiosError?.response?.status;

  switch (status) {
    case 401:
      return new ApiError("You are not authorised to view this content.", status);
    case 403:
      return new ApiError("Access to this content is restricted.", status);
    case 404:
      return new ApiError("The requested information could not be found.", status);
    case 409:
      return new ApiError("This submission conflicts with an existing record.", status);
    case 500:
      return new ApiError(
        "The service is temporarily unavailable. Please try again shortly.",
        status,
      );
    default:
      if (!status)
        return new ApiError(
          "We could not reach the conference service. Please check your connection.",
        );
      return new ApiError("Something went wrong. Please try again.", status);
  }
}

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);

/** Public endpoint paths mapped to Spring Boot /api/public/v1/conferences/{identifier} */
export const endpoints = {
  conference: (identifier: string) => `/api/public/v1/conferences/${identifier}`,
  about: (identifier: string) => `/api/public/v1/conferences/${identifier}/about`,
  tracks: (identifier: string) => `/api/public/v1/conferences/${identifier}/tracks`,
  importantDates: (identifier: string) => `/api/public/v1/conferences/${identifier}/important-dates`,
  speakers: (identifier: string) => `/api/public/v1/conferences/${identifier}/speakers`,
  speaker: (identifier: string, id?: number | string) => `/api/public/v1/conferences/${identifier}/speakers`,
  committee: (identifier: string) => `/api/public/v1/conferences/${identifier}/committee`,
  workshopBanners: (identifier: string) => `/api/public/v1/conferences/${identifier}/workshops`,
  sponsors: (identifier: string) => `/api/public/v1/conferences/${identifier}/sponsors`,
  mediaPartners: (identifier: string) => `/api/public/v1/conferences/${identifier}/media-partners`,
  attendeesFrom: (identifier: string) => `/api/public/v1/conferences/${identifier}/attendees-from`,
  files: (fileId?: number | string) => (fileId ? `/api/public/v1/files/${fileId}` : `/api/conference/files`),
  updates: (identifier: string) => `/api/public/v1/conferences/${identifier}/updates`,
  program: (identifier: string) => `/api/public/v1/conferences/${identifier}/program`,
  venue: (identifier: string) => `/api/public/v1/conferences/${identifier}/venue`,
  accommodation: (identifier: string) => `/api/public/v1/conferences/${identifier}/accommodation`,
  registrations: (identifier: string) => `/api/public/v1/conferences/${identifier}/registrations`,
  registration: (identifier: string, number: string) => `/api/public/v1/conferences/${identifier}/registrations/${number}`,
  paymentLink: (number: string) => `/api/public/registrations/${number}/payment-link`,
  abstracts: (identifier: string) => `/api/public/v1/conferences/${identifier}/abstracts`,
} as const;
