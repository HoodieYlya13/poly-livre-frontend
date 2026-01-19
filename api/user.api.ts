import { fetchApi } from "./base.api";
import { User } from "@/models/user.models";

export const userApi = {
  updateUsername: (username: string) =>
    fetchApi<User>(`/users/${username}`, {
      method: "PUT",
    }),

  getMe: () =>
    fetchApi<User>("/users/me", {
      method: "GET",
    }),

  // TODO: create the endpoint
  subscribeToNewsletter: (email: string) =>
    fetchApi<void>(`/users/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email }),
      userAuthenticated: false,
    }),
};
