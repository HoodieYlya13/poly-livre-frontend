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
    
    const response = await fetch(
      "http://localhost:8080/auth/magic-link/request?email=" + data.email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const json = await response.json(); // TODO: verify response when backend fixed

    if (!json.success)
      return setError("root", { message: "MAGIC_LINK_FAILED" });

    setSuccessText("MAGIC_LINK_SENT");
  } catch {
    setError("root", { message: "GENERIC" });
  }
}