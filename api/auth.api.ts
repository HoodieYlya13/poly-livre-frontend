import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/browser";
import { fetchApi } from "./base.api";
import { AuthResponse } from "@/models/auth.models";
import { Passkey } from "@/models/passkey.models";

export const authApi = {
  loginMagicLink: (email: string) =>
    fetchApi<{ success: boolean }>(
      `/auth/magic-link/request?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        userAuthenticated: false,
      }
    ),
  verifyMagicLink: (token: string) =>
    fetchApi<AuthResponse>(`/auth/magic-link/verify?token=${token}`, {
      method: "POST",
      userAuthenticated: false,
    }),

  loginStartPasskey: () =>
    fetchApi<PublicKeyCredentialRequestOptionsJSON>(
      "/auth/passkey/login/start",
      {
        method: "POST",
        userAuthenticated: false,
      }
    ),

  loginPasskeyFinish: (
    credential: AuthenticationResponseJSON,
    cookieHeader: string
  ) =>
    fetchApi<AuthResponse>("/auth/passkey/login/finish", {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      body: JSON.stringify(credential),
      userAuthenticated: false,
    }),

  registerPasskeyStart: (email: string, passkeyName: string) =>
    fetchApi<PublicKeyCredentialCreationOptionsJSON>(
      `/auth/passkey/register/start?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(passkeyName)}`,
      {
        method: "POST",
      }
    ),

  registerPasskeyFinish: (
    credential: RegistrationResponseJSON,
    email: string,
    passkeyName: string
  ) =>
    fetchApi<void>(
      `/auth/passkey/register/finish?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(passkeyName)}`,
      {
        method: "POST",
        body: JSON.stringify(credential),
        userAuthenticated: false,
      }
    ),

  loginTestingMode: (password: string) =>
    fetchApi<{ success: boolean }>("/auth/testing-mode", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: password,
      userAuthenticated: false,
    }),

  getUserPasskeys: (userId: string) =>
    fetchApi<Passkey[]>(`/auth/passkeys/${userId}`, {
      method: "GET",
    }),

  renamePasskey: (userId: string, passkeyId: string, passkeyName: string) =>
    fetchApi<void>(
      `/auth/passkeys/${userId}/${passkeyId}?name=${encodeURIComponent(passkeyName)}`,
      {
        method: "PUT",
      }
    ),

  deletePasskey: (userId: string, passkeyId: string) =>
    fetchApi<void>(`/auth/passkeys/${userId}/${passkeyId}`, {
      method: "DELETE",
    }),
};
