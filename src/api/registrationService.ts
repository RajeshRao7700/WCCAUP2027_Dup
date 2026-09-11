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
      amount: payload.amount ?? 10,
      currency: payload.currency ?? "INR",
      paymentStatus: payload.paymentStatus ?? "PENDING",
      paymentReference: payload.paymentReference || undefined,
    };
    return postResource<any, RegistrationResponse>(
      endpoints.registrations(appConfig.conferenceShortName),
      backendPayload,
      (data) => ({
        registrationNumber: `REG-${Date.now().toString().slice(-6)}`,
        email: data.email,
        paymentStatus: payload.paymentStatus ?? "PENDING",
        paymentReference: payload.paymentReference,
        amount: payload.amount ?? 10,
        currency: payload.currency ?? "INR",
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
