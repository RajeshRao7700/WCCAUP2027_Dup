import type { Hotel, ProgramDay, VenueInfo } from "@/types/conference";
import { endpoints } from "./axiosClient";
import { fetchResource } from "./adapter";
import { mockHotels, mockProgram, mockVenue } from "@/data/mockData";

/**
 * Programme, venue and accommodation content. The backend does not yet expose
 * these; the mock layer is isolated here so it can be swapped for real
 * endpoints without touching the UI.
 */
export const programService = {
  getProgram: () => fetchResource<ProgramDay[]>(endpoints.program, () => mockProgram),
};

export const venueService = {
  getVenue: () => fetchResource<VenueInfo>(endpoints.venue, () => mockVenue),
};

export const accommodationService = {
  getHotels: () => fetchResource<Hotel[]>(endpoints.accommodation, () => mockHotels),
};
