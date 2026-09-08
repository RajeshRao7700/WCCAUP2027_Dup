import type {
  RegistrationCategory,
  RegistrationRequest,
  RegistrationResponse,
} from "@/types/conference";
import { axiosClient, endpoints } from "./axiosClient";
import { fetchResource, normalizeKeys, postResource } from "./adapter";
import { registrationCategories } from "@/data/mockData";
import { appConfig } from "@/config/site";

export const registrationService = {
  getCategories: () =>
    fetchResource<RegistrationCategory[]>(
      `/api/public/v1/conferences/${appConfig.conferenceShortName}/registration-categories`,
      () => registrationCategories,
    ),

  createRegistration: (payload: RegistrationRequest) => {
    const backendPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone || "",
      organization: payload.organization || "",
      designation: payload.designation || "",
      country: payload.country || "",
      registrationType: payload.registrationCategory,
      amount: 0,
      currency: "USD",
    };
    return postResource<any, RegistrationResponse>(
      endpoints.registrations(appConfig.conferenceShortName),
      backendPayload,
      (data) => ({
        registrationNumber: "DEMO-REG-0000",
        email: data.email,
        paymentStatus: "PENDING",
      }),
    );
  },

  getRegistration: (registrationNumber: string) =>
    fetchResource<RegistrationResponse>(
      endpoints.registration(appConfig.conferenceShortName, registrationNumber),
      () => ({
        registrationNumber,
        email: "",
        paymentStatus: "PENDING",
      }),
    ),

  /**
   * The payment link is produced by the backend PaymentProvider.
   */
  generatePaymentLink: async (registrationNumber: string): Promise<RegistrationResponse> => {
    if (appConfig.useMockData) {
      return { registrationNumber, email: "", paymentStatus: "PENDING" };
    }
    const response = await axiosClient.post<unknown>(endpoints.paymentLink(registrationNumber));
    return normalizeKeys(response.data) as RegistrationResponse;
  },
};
