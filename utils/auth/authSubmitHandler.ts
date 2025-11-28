import { LoginMagicLinkValues } from "@/schemas/authMagicLinkFormSchema";
import { UseFormSetError } from "react-hook-form";

export async function authSubmitHandler(
  data: LoginMagicLinkValues,
  clearErrors: () => void,
  setError: UseFormSetError<LoginMagicLinkValues>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>,
) {
  try {
    clearErrors();
    
    const response = await fetch("/api/auth/magic-link/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    
    const json = await response.json();

    if (!json.success)
      return setError("root", { message: "MAGIC_LINK_FAILED" });

    setSuccessText("MAGIC_LINK_SENT");
  } catch {
    setError("root", { message: "GENERIC" });
  }
}