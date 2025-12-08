"use server";

import { authApi } from "@/api/auth.api";
import { checkRateLimit } from "@/utils/rateLimit";

export async function getPasskeyRegistrationOptionsAction(
  email: string,
  passkeyName: string
) {
  try {
    await checkRateLimit("authRegisterPasskeyStart");

    const response = await authApi.registerPasskeyStart(email, passkeyName);

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

    await authApi.registerPasskeyFinish(
      credential,
      email,
      passkeyName
    );

    return true;
  } catch (error) {
    console.error("verifyPasskeyRegistration error:");
    throw error;
  }
}
