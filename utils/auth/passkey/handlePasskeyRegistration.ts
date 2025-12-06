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
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>,
  reconnect: () => void
) {
  clearErrors();
  setSuccessText(null);
  try {
    const options = await getPasskeyRegistrationOptions(email, passkeyName);

    const attResp = await startRegistration({ optionsJSON: options });

    const verificationRes = await verifyPasskeyRegistration(
      email,
      attResp,
      passkeyName
    );

    if (verificationRes.success)
      return setSuccessText("PASSKEY_REGISTER_SUCCESS");
  } catch (error: unknown) {
    let message = "PASSKEY_ERROR";

    if (error instanceof Error) {
      if (error.name === "InvalidStateError") message = "PASSKEY_ALREADY_EXISTS";
      else if (error.message.startsWith("AUTH_00")) message = error.message;
    }

    setError("root", { message });
    if (message !== "PASSKEY_ERROR" && message !== "PASSKEY_ALREADY_EXISTS")
      reconnect();
  }
}
