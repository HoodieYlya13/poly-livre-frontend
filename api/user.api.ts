import { fetchApi } from "./base.api";
import { Testimonial, UserSession } from "@/models/user.models";

export const userApi = {
  updateUsername: (username: string) =>
    fetchApi<UserSession>(`/users/${username}`, {
      method: "PUT",
    }),

  getMe: () =>
    fetchApi<UserSession>("/users/me", {
      method: "GET",
    }),

  // TODO: create the endpoint
  getTestimonials: () =>
    fetchApi<Testimonial[]>("/users/testimonials", {
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
