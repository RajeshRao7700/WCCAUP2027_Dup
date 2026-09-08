import type { Track } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockTracks } from "@/data/mockData";

export const trackService = {
  getTracks: async (): Promise<Track[]> =>
    sortByDisplayOrder(
      onlyActive(
        await fetchResource<Track[]>(
          endpoints.tracks(appConfig.conferenceShortName),
          () => mockTracks,
        ),
      ),
    ),
};
