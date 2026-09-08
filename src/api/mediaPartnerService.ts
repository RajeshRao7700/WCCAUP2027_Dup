import type { MediaPartner } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockMediaPartners } from "@/data/mockData";

export const mediaPartnerService = {
  getMediaPartners: async (): Promise<MediaPartner[]> =>
    sortByDisplayOrder(
      onlyActive(
        await fetchResource<MediaPartner[]>(
          endpoints.mediaPartners(appConfig.conferenceShortName),
          () => mockMediaPartners,
        ),
      ),
    ),
};
