import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { getPasskeyLoginOptionsAction, verifyPasskeyLoginAction } from "./login.passkey.actions";
import { getPasskeyRegistrationOptionsAction, verifyPasskeyRegistrationAction } from "./register.passkey.actions";

export async function loginPasskeyAction() {
  try {
    const options = await getPasskeyLoginOptionsAction();

    const asseResp = await startAuthentication({ optionsJSON: options });

    return await verifyPasskeyLoginAction(asseResp);
  } catch (error) {
    console.error("Login with Passkey error:");
    let message = "PASSKEY_ERROR";

    if (error instanceof Error) { // TODO: create enum for errors or use a library or something else to handle all APIs' errors
      if (error.name === "NotAllowedError")
        message = "PASSKEY_ERROR";
      else if (
        error.message.startsWith("AUTH_00") ||
        error.message.startsWith("SYST_00") ||
        error.message === "TOO_MANY_REQUESTS"
      )
       message = error.message;
    }

    throw new Error(message);
  }
}

export async function registerPasskeyAction(
  email: string,
  passkeyName: string
) {
  try {
    const options = await getPasskeyRegistrationOptionsAction(
      email,
      passkeyName
    );

    const attResp = await startRegistration({ optionsJSON: options });

    return await verifyPasskeyRegistrationAction(attResp, email, passkeyName);
  } catch (error) {
    console.error("Register Passkey error:");
    let message = "PASSKEY_ERROR";

    if (error instanceof Error) {
      if (error.name === "InvalidStateError")
        message = "PASSKEY_ALREADY_EXISTS";
      else if (error.name === "NotAllowedError")
        message = "PASSKEY_ERROR";
      else if (
        error.message.startsWith("AUTH_00") ||
        error.message.startsWith("SYST_00") ||
        error.message === "TOO_MANY_REQUESTS" ||
        error.message === "API_UNKNOWN_ERROR"
      )
       message = error.message;
    }

    throw new Error(message);
  }
}
