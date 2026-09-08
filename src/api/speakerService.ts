import type { Speaker } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive } from "./adapter";
import { mockSpeakers } from "@/data/mockData";

export const speakerService = {
  /** Public listing never includes withdrawn speakers. */
  getSpeakers: async (): Promise<Speaker[]> => {
    const rawSpeakers = await fetchResource<any[]>(
      endpoints.speakers(appConfig.conferenceShortName),
      () => mockSpeakers,
    );
    const speakers: Speaker[] = rawSpeakers.map((s) => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      designation: s.designation,
      organization: s.organization,
      country: s.country,
      category: s.category,
      photoUrl: s.photoUrl,
      biography: s.biography || s.bio,
      status: s.status ?? true,
    }));
    return onlyActive(speakers).filter((s) => s.category !== "UNABLE_TO_ATTEND");
  },
  getSpeaker: async (id: number | string): Promise<Speaker | undefined> => {
    const speakers = await speakerService.getSpeakers();
    return speakers.find((s) => String(s.id) === String(id));
  },
};
