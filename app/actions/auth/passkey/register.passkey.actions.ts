"use server";

import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";

export async function getPasskeyRegistrationOptionsAction(
  email: string,
  passkeyName: string
) {
  try {
    await checkRateLimit("authRegisterPasskeyStart");

    const token = await getUserAccessToken();
    if (!token) throw new Error("AUTH_004");

    const response = await authApi.registerPasskeyStart(
      email,
      passkeyName,
      token
    );
    
    return await response.json();
  } catch (error) {
    console.error("getPasskeyRegistrationOptions error:");
    throw error;
  }
}

export async function verifyPasskeyRegistrationAction(
  credential: unknown,
  email: string,
  passkeyName: string
) {
  try {
    await checkRateLimit("authRegisterPasskeyFinish");

    return await authApi.registerPasskeyFinish(
      credential,
      email,
      passkeyName
    );
  } catch (error) {
    console.error("verifyPasskeyRegistration error:");
    throw error;
  }
}