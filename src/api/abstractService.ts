import type { AbstractSubmissionRequest, AbstractSubmissionResponse } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { postResource } from "./adapter";

export const abstractService = {
  submitAbstract: (payload: AbstractSubmissionRequest) => {
    const authorName = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
    const backendPayload = {
      title: payload.abstractTitle,
      abstractText: payload.abstractBody,
      keywords: payload.keywords || "",
      presentationType: payload.presentationType,
      authorName,
      authorEmail: payload.email,
      authorPhone: payload.phone || "",
      authorOrganization: payload.organization || "",
      authorCountry: payload.country || "",
    };
    return postResource<any, AbstractSubmissionResponse>(
      endpoints.abstracts(appConfig.conferenceShortName),
      backendPayload,
      (data) => ({
        abstractNumber: "DEMO-ABS-0000",
        submissionStatus: "SUBMITTED",
        email: payload.email,
      }),
    );
  },
};
