import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { getPasskeyLoginOptionsAction, verifyPasskeyLoginAction } from "./login.passkey.actions";
import { getPasskeyRegistrationOptionsAction, verifyPasskeyRegistrationAction } from "./register.passkey.actions";
import { getErrorMessage } from "@/api/api.errors";

export async function loginPasskeyAction() {
  try {
    const options = await getPasskeyLoginOptionsAction();

    const asseResp = await startAuthentication({ optionsJSON: options });

    return await verifyPasskeyLoginAction(asseResp);
  } catch (error) {
    console.error("Login with Passkey error:", error);
    
    const message = getErrorMessage(error, "PASSKEY_ERROR");

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
    console.error("Register Passkey error:", error);

    const message = getErrorMessage(error, "PASSKEY_ERROR", {
      InvalidStateError: "PASSKEY_ALREADY_EXISTS",
    });

    throw new Error(message);
  }
}
