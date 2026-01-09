"use server";

import {
  getServerCookies,
  setServerCookie,
  setUserSessionCookies,
} from "@/utils/cookies/cookies.server";
import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { AuthenticationResponseJSON } from "@simplewebauthn/browser";

export async function getPasskeyLoginOptionsAction() {
  return baseServerAction(
    "authLoginStartPasskey",
    async () => {
      const response = await authApi.loginStartPasskey();

      if (!response.ok) throw new Error("AUTH_002");

      let [name, value] = ["", ""];
      const setCookieHeader = response.headers.get("set-cookie");
      if (setCookieHeader)
        setCookieHeader.split(/,(?=\s*[^;]+=[^;]+)/g).forEach((cookieStr) => {
          [name, value] = cookieStr.split(";")[0].split("=");
        });

      if (name && value)
        await setServerCookie(name, value, {
          maxAge: 60,
        });

      return await response.json();
    },
    {
      rawError: true,
    }
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
    {
      rawError: true,
    }
  );
}
