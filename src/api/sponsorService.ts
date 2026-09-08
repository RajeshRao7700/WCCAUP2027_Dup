import type { Sponsor } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockSponsors } from "@/data/mockData";

export const sponsorService = {
  getSponsors: async (): Promise<Sponsor[]> =>
    sortByDisplayOrder(
      onlyActive(
        await fetchResource<Sponsor[]>(
          endpoints.sponsors(appConfig.conferenceShortName),
          () => mockSponsors,
        ),
      ),
    ),
};
