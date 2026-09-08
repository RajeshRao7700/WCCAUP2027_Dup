import type { WorkshopBanner } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockWorkshops } from "@/data/mockData";

export const workshopService = {
  getWorkshopBanners: async (): Promise<WorkshopBanner[]> => {
    const rawWorkshops = await fetchResource<any[]>(
      endpoints.workshopBanners(appConfig.conferenceShortName),
      () => mockWorkshops,
    );
    const workshops: WorkshopBanner[] = rawWorkshops.map((w) => ({
      id: w.id,
      title: w.title,
      bannerUrl: w.bannerUrl || w.imageUrl,
      description: w.description,
      displayOrder: w.displayOrder ?? 0,
      status: w.status ?? true,
    }));
    return sortByDisplayOrder(onlyActive(workshops));
  },
};
