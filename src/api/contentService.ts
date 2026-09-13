import type { Hotel, ProgramDay, VenueInfo } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource } from "./adapter";
import { mockHotels, mockProgram, mockVenue } from "@/data/mockData";

/**
 * Programme, venue and accommodation content. Integrated with backend
 * endpoints with automatic mock fallback.
 */
export const programService = {
  getProgram: () =>
    fetchResource<ProgramDay[]>(endpoints.program(appConfig.conferenceShortName), () => mockProgram),
};

export const venueService = {
  getVenue: () =>
    fetchResource<VenueInfo>(endpoints.venue(appConfig.conferenceShortName), () => mockVenue),
};

export const accommodationService = {
  getHotels: () =>
    fetchResource<Hotel[]>(
      endpoints.accommodation(appConfig.conferenceShortName),
      () => mockHotels,
    ),
};
