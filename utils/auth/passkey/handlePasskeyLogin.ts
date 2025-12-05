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

    const asseResp = await startAuthentication(options);

    const verificationRes = await verifyPasskeyLogin(asseResp);

    if (verificationRes.success) return verificationRes.username;
    else setErrorText("PASSKEY_FAILED");
    return false;
  } catch (error) {
    console.error(error);
    setErrorText("PASSKEY_ERROR");
    return false;
  } finally {
    setLoading(false);
  }
}
