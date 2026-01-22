"use server";

import { getServerCookies, setUserSessionCookies } from "@/utils/cookies/cookies.server";
import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { AuthenticationResponseJSON } from "@simplewebauthn/browser";

// TODO: Add validation

export async function getPasskeyLoginOptionsAction() {
  return baseServerAction(
    "authLoginStartPasskey",
    async () => {
      return await authApi.loginStartPasskey();
    },
    {}
  );
}

export async function verifyPasskeyLoginAction(
  credential: AuthenticationResponseJSON
) {
  return baseServerAction(
    "authLoginPasskeyFinish",
    async () => {
      const cookieHeader = await getServerCookies();

      const user = await authApi.loginPasskeyFinish(credential, cookieHeader);

      await setUserSessionCookies(user);

      return user.username;
    },
    {}
  );
}
