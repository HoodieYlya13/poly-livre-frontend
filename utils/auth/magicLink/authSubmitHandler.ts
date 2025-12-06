import { authApi } from "@/api/auth.api";
import { LoginMagicLinkValues } from "@/schemas/authMagicLinkFormSchema";
import { UseFormSetError } from "react-hook-form";

export async function authSubmitHandler(
  data: LoginMagicLinkValues,
  clearErrors: () => void,
  setError: UseFormSetError<LoginMagicLinkValues>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  try {
    clearErrors();

    const json = await authApi.loginMagicLink(data.email); // TODO: verify response when backend fixed

    if (!json.success)
      return setError("root", { message: "MAGIC_LINK_FAILED" });

    setSuccessText("MAGIC_LINK_SENT");
  } catch {
    setError("root", { message: "GENERIC" });
  }
}
