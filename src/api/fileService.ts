import type { AttendeeFrom, ConferenceFile, ConferenceUpdate } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockAttendeesFrom, mockFiles, mockUpdates } from "@/data/mockData";

export const fileService = {
  /** Always uses the file URL returned by the API — never a filesystem path. */
  getFiles: async (): Promise<ConferenceFile[]> =>
    sortByDisplayOrder(
      onlyActive(await fetchResource<ConferenceFile[]>(endpoints.files(), () => mockFiles)),
    ),
};

export const attendeeService = {
  getAttendeesFrom: async (): Promise<AttendeeFrom[]> => {
    const rawAttendees = await fetchResource<any[]>(
      endpoints.attendeesFrom(appConfig.conferenceShortName),
      () => mockAttendeesFrom,
    );
    const attendees: AttendeeFrom[] = rawAttendees.map((a) => ({
      id: a.id,
      name: a.name || a.countryName,
      displayOrder: a.displayOrder ?? 0,
      status: a.status ?? true,
    }));
    return sortByDisplayOrder(onlyActive(attendees));
  },
};

export const updateService = {
  getUpdates: async (): Promise<ConferenceUpdate[]> => {
    const updates = await fetchResource<ConferenceUpdate[]>(
      endpoints.updates(appConfig.conferenceShortName),
      () => mockUpdates,
    );
    return onlyActive(updates).sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  },
};
