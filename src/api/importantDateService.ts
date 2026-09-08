import type { ImportantDate } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockImportantDates } from "@/data/mockData";

export const importantDateService = {
  getImportantDates: async (): Promise<ImportantDate[]> => {
    const rawDates = await fetchResource<any[]>(
      endpoints.importantDates(appConfig.conferenceShortName),
      () => mockImportantDates,
    );
    const dates: ImportantDate[] = rawDates.map((d) => ({
      id: d.id,
      title: d.title,
      date: d.date || d.eventDate,
      description: d.description,
      displayOrder: d.displayOrder ?? 0,
      status: d.status ?? true,
    }));
    return sortByDisplayOrder(onlyActive(dates));
  },
};
