import type { AbstractSubmissionRequest, AbstractSubmissionResponse } from "@/types/conference";
import { appConfig } from "@/config/site";
import { endpoints } from "./axiosClient";
import { postResource } from "./adapter";

export const abstractService = {
  submitAbstract: (payload: AbstractSubmissionRequest) => {
    const backendPayload = {
      title: payload.abstractTitle,
      abstractText: payload.abstractBody,
      keywords: payload.keywords || "",
      presentationType: payload.presentationType,
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
