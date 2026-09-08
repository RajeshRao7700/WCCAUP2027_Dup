import type { AboutConference, Conference, HighlightItem } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource } from "./adapter";
import { mockAbout, mockConference, mockHighlights } from "@/data/mockData";

export const conferenceService = {
  getConference: () =>
    fetchResource<Conference>(
      endpoints.conference(appConfig.conferenceShortName),
      () => mockConference,
    ),
  getAbout: async (): Promise<AboutConference> => {
    const raw = await fetchResource<any>(
      endpoints.about(appConfig.conferenceShortName),
      () => mockAbout,
    );
    if (!raw) return mockAbout;
    if (Array.isArray(raw.paragraphs)) return raw as AboutConference;
    return {
      id: raw.id ?? 1,
      heading: raw.theme || raw.heading || `About ${appConfig.conferenceShortName}`,
      summary: raw.description || raw.summary || mockAbout.summary,
      paragraphs: raw.description ? [raw.description] : mockAbout.paragraphs,
      highlights: raw.highlights ? [{ title: "Focus Areas", description: raw.highlights }] : mockAbout.highlights,
      status: raw.status ?? true,
    };
  },
  getHighlights: () =>
    fetchResource<HighlightItem[]>(
      `/api/public/v1/conferences/${appConfig.conferenceShortName}/highlights`,
      () => mockHighlights,
    ),
};
