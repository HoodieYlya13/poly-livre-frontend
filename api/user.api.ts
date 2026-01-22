import { LocaleLanguages } from "@/i18n/utils";
import { fetchApi } from "./base.api";
import { Testimonial } from "@/models/user.models";
import { AuthResponse } from "@/models/auth.models";

export const userApi = {
  updateUsername: (username: string) =>
    fetchApi<AuthResponse>(`/users/${username}`, {
      method: "PUT",
    }),

  getMe: () =>
    fetchApi<AuthResponse>("/users/me", {
      method: "GET",
    }),

  getTestimonials: (locale: LocaleLanguages) =>
    fetchApi<Testimonial[]>(`/users/testimonials/${locale}`, {
      method: "GET",
      userAuthenticated: false,
    }),

  // TODO: create the endpoint
  subscribeToNewsletter: (email: string) =>
    fetchApi<void>(`/users/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email }),
      userAuthenticated: false,
    }),
};
