"use server";

import { setServerCookie } from "../../cookies/server/cookiesServer";

export async function verifyMagicLink(token: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/magic-link/verify?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Verification failed");

    const data = await response.json();

    await setServerCookie("user_access_token", data.token, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_id", data.userId, {
      maxAge: data.expiresIn,
    });

    await setServerCookie("user_email", data.email, {
      maxAge: data.expiresIn,
    });

    if (data.username) {
      await setServerCookie("user_name", data.username, {
        maxAge: data.expiresIn,
        httpOnly: false,
      });

      return { success: true, username: data.username };
    }

    return { success: true };
  } catch (error) {
    console.error("Magic link verification error:", error);
    return { success: false, error: "Verification failed" };
  }
}
