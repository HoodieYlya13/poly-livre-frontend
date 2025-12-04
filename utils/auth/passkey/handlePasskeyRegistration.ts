import { startRegistration } from "@simplewebauthn/browser";
import {
  getPasskeyRegistrationOptions,
  verifyPasskeyRegistration,
} from "@/utils/auth/passkey/passkeyHelpers";

export async function handlePasskeyRegistration(
  email: string,
  passkeyName: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setErrorText(null);
  setSuccessText(null);
  try {
    const options = await getPasskeyRegistrationOptions(email, passkeyName);

    const attResp = await startRegistration(options);

    const verificationRes = await verifyPasskeyRegistration(
      email,
      attResp,
      passkeyName
    );

    if (verificationRes.success) setSuccessText("PASSKEY_REGISTER_SUCCESS");
    else setErrorText("PASSKEY_REGISTER_FAILED");
  } catch (error) {
    console.error(error);
    setErrorText("PASSKEY_REGISTER_ERROR");
  } finally {
    setLoading(false);
  }
}
