import { fetchApi } from "./base.api";
import { UserDto } from "@/models/user.models";

export const userApi = {
  updateUsername: (username: string, token: string) =>
    fetchApi<UserDto>(`/users/${username}`, {
      method: "PUT",
      token,
    }),

  getMe: (token: string) => fetchApi<UserDto>("/users/me", {
    method: "GET",
    token,
  }),
};
