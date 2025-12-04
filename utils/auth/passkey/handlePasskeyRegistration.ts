"use client";

import { startRegistration } from "@simplewebauthn/browser";
import {
  getPasskeyRegistrationOptions,
  verifyPasskeyRegistration,
} from "@/utils/auth/passkey/passkeyHelpers";
import { UseFormSetError } from "react-hook-form";
import { UpdatePasskeyNameValues } from "@/schemas/updatePasskeyNameFormSchema";

export async function handlePasskeyRegistration(
  email: string,
  passkeyName: string,
  clearErrors: () => void,
  setError: UseFormSetError<UpdatePasskeyNameValues>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  try {
    clearErrors();

    const options = await getPasskeyRegistrationOptions(email, passkeyName);

    const attResp = await startRegistration(options);

    const verificationRes = await verifyPasskeyRegistration(
      email,
      attResp,
      passkeyName
    );

    if (verificationRes.success) setSuccessText("PASSKEY_REGISTER_SUCCESS");
    else setError("root", { message: "PASSKEY_REGISTER_FAILED" });
  } catch (error) {
    console.error(error);
    setError("root", { message: "GENERIC" });
  }
}
