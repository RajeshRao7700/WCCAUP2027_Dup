import type { CoreCommitteeMember } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { fetchResource, onlyActive, sortByDisplayOrder } from "./adapter";
import { mockCommittee } from "@/data/mockData";

export const committeeService = {
  getCommittee: async (): Promise<CoreCommitteeMember[]> => {
    const rawMembers = await fetchResource<any[]>(
      endpoints.committee(appConfig.conferenceShortName),
      () => mockCommittee,
    );
    const members: CoreCommitteeMember[] = rawMembers.map((m) => {
      let firstName = m.firstName || "";
      let lastName = m.lastName || "";
      if (!firstName && m.name) {
        const parts = m.name.trim().split(" ");
        firstName = parts[0] || "";
        lastName = parts.slice(1).join(" ") || "";
      }
      return {
        id: m.id,
        firstName,
        lastName,
        name: m.name || `${firstName} ${lastName}`.trim(),
        designation: m.designation,
        organization: m.organization,
        phone: m.phone,
        email: m.email,
        photoUrl: m.photoUrl,
        country: m.country,
        displayOrder: m.displayOrder ?? 0,
        status: m.status ?? true,
      };
    });
    return sortByDisplayOrder(onlyActive(members));
  },
};
