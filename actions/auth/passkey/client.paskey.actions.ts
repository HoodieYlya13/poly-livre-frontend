import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  getPasskeyLoginOptionsAction,
  verifyPasskeyLoginAction,
} from "./login.passkey.actions";
import {
  getPasskeyRegistrationOptionsAction,
  verifyPasskeyRegistrationAction,
} from "./register.passkey.actions";

import { baseClientAction } from "@/actions/base.client.actions";
import { ERROR_CODES } from "@/utils/errors.utils";
import { PasskeyNameSchema } from "@/schemas/stringSchemas";

export async function loginPasskeyAction() {
  return await baseClientAction(
    "loginPasskeyAction",
    async () => {
      const options = await getPasskeyLoginOptionsAction();

      const asseResp = await startAuthentication({ optionsJSON: options });

      return await verifyPasskeyLoginAction(asseResp);
    },
    {
      fallback: ERROR_CODES.PASSKEY.ERROR_LOGIN,
    }
  );
}

export async function registerPasskeyAction(passkeyName: string) {
  return await baseClientAction(
    "registerPasskeyAction",
    async () => {
      const validationResult = PasskeyNameSchema.safeParse({ passkeyName });

      if (!validationResult.success) throw new Error();

      const options = await getPasskeyRegistrationOptionsAction(validationResult.data.passkeyName);

      const attResp = await startRegistration({ optionsJSON: options });

      return await verifyPasskeyRegistrationAction(attResp, passkeyName);
    },
    {
      fallback: ERROR_CODES.PASSKEY.ERROR_REGISTER,
      overrides: {
        InvalidStateError: ERROR_CODES.PASSKEY.ALREADY_EXISTS,
      },
    }
  );
}
