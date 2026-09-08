import { appConfig } from "@/config/site";
import { axiosClient } from "./axiosClient";

/**
 * Single switch between mock data and the real backend.
 * Both branches must return the same TypeScript interfaces.
 */
export async function fetchResource<T>(path: string, mock: () => T): Promise<T> {
  if (appConfig.useMockData) {
    await delay();
    return mock();
  }
  try {
    const response = await axiosClient.get<unknown>(path);
    const normalized = normalizeKeys(response.data) as T;
    // If backend returned empty list, fall back to mock data if mock has items
    if (Array.isArray(normalized) && normalized.length === 0) {
      const fallback = mock();
      if (Array.isArray(fallback) && fallback.length > 0) {
        return fallback as T;
      }
    }
    return normalized;
  } catch (error) {
    console.warn(`[CMS API] Fallback to default data for ${path}:`, error);
    return mock();
  }
}

export async function postResource<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  mock: (payload: TRequest) => TResponse,
): Promise<TResponse> {
  if (appConfig.useMockData) {
    await delay(600);
    return mock(payload);
  }
  const response = await axiosClient.post<unknown>(path, payload);
  return normalizeKeys(response.data) as TResponse;
}

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Backend responses may use snake_case — map once, here, never in components. */
export function normalizeKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase()),
        normalizeKeys(val),
      ]),
    );
  }
  // Auto-prefix relative media URLs with backend base URL if applicable
  if (typeof value === "string" && value.startsWith("/api/")) {
    return `${appConfig.apiBaseUrl}${value}`;
  }
  return value;
}

export function sortByDisplayOrder<T extends { displayOrder?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

export function onlyActive<T extends { status?: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.status === undefined || item.status === true);
}
