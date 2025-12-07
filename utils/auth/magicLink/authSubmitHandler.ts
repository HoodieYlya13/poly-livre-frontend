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

    if (json.success)
      return setSuccessText("MAGIC_LINK_SENT");
  } catch (error: unknown) {
    console.error("authSubmitHandler error:", error);
    const message =
      error instanceof Error && (error.message.startsWith("AUTH_00") || error.message.startsWith("MAGIC_LINK_FAILED"))
        ? error.message
        : "MAGIC_LINK_FAILED";

    setError("root", { message });
  }
}
