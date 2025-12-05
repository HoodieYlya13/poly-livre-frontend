"use server";

import { BACKEND_URL } from "@/utils/constants";
import {
  deleteServerUserCookies,
  getServerCookies,
  setServerCookie,
} from "@/utils/cookies/server/cookiesServer";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { redirect } from "next/navigation";

export async function getPasskeyLoginOptions() {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/passkey/login/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to get login options");

    let [name, value] = "";
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
  } catch (error) {
    console.error("getPasskeyLoginOptions error:", error);
    throw error;
  }
}

export async function verifyPasskeyLogin(credential: unknown) {
  try {
    const cookieHeader = await getServerCookies();

    const response = await fetch(`${BACKEND_URL}/auth/passkey/login/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) throw new Error("Login verification failed");

    const data = await response.json();

    await setServerCookie("user_access_token", data.token, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_id", data.userId, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_name", data.username, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_email", data.email, {
      maxAge: data.expiresIn,
    });

    return { success: true };
  } catch (error) {
    console.error("verifyPasskeyLogin error:", error);
    return { success: false, error: "Verification failed" };
  }
}

export async function getPasskeyRegistrationOptions(
  email: string,
  passkeyName: string
) {
  // FIXME: useSuspenseQuery, suspense, activity, https://youtu.be/Ubbb1RK7iFs?si=QrN0yxMwxjfJF49X
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${BACKEND_URL}/auth/passkey/register/start?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(passkeyName)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) return await response.json();

    const errorBody = await response.json();
    if (errorBody.code) {
      console.error(
        "getPasskeyRegistrationOptions error:",
        errorBody.description
      );
      await deleteServerUserCookies();
      redirect("/auth");
    }

    throw new Error("Failed to get registration options");
  } catch (error) {
    console.error("getPasskeyRegistrationOptions error:", error);
    throw error;
  }
}

export async function verifyPasskeyRegistration(
  email: string,
  credential: unknown,
  passkeyName: string
) {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${BACKEND_URL}/auth/passkey/register/finish?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(passkeyName)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credential),
      }
    );

    if (response.ok) return { success: true };

    const errorBody = await response.json();
    if (errorBody.code) {
      console.error(
        "getPasskeyRegistrationOptions error:",
        errorBody.description
      );
      await deleteServerUserCookies();
      redirect("/auth");
    }

    throw new Error("Registration verification failed");
  } catch (error) {
    console.error("verifyPasskeyRegistration error:", error);
    return { success: false };
  }
}
