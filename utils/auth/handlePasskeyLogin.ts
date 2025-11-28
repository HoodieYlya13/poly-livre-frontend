import { startAuthentication } from "@simplewebauthn/browser";

export async function handlePasskeyLogin(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setLoading(true);
  setErrorText(null);
  setSuccessText(null);
  try {
    const optionsRes = await fetch("/api/auth/passkey/generate-options", {
      method: "POST",
    });
    const options = await optionsRes.json();

    const asseResp = await startAuthentication(options);

    const verificationRes = await fetch("/api/auth/passkey/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asseResp),
    });

    const verificationJSON = await verificationRes.json();

    if (verificationJSON.verified) setSuccessText("PASSKEY_SUCCESS");
    else setErrorText("PASSKEY_FAILED");
  } catch (error) {
    console.error(error);
    setErrorText("PASSKEY_ERROR");
  } finally {
    setLoading(false);
  }
}
