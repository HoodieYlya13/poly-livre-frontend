import { startAuthentication } from "@simplewebauthn/browser";
import {
  getPasskeyLoginOptions,
  verifyPasskeyLogin,
} from "@/utils/auth/passkey/passkeyHelpers";

export async function handlePasskeyLogin(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setErrorText(null);
  setSuccessText(null);
  try {
    const options = await getPasskeyLoginOptions();

    const asseResp = await startAuthentication({ optionsJSON: options });

    const verificationRes = await verifyPasskeyLogin(asseResp);

    if (verificationRes.success)
      return { success: true, username: verificationRes.username };

    throw verificationRes.error;
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message.startsWith("AUTH_00")
        ? error.message
        : "PASSKEY_ERROR";
    setErrorText(message);
    return { success: false, error: message };
  } finally {
    setLoading(false);
  }
}
