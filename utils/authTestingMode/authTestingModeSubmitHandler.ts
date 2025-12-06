import { UseFormSetError } from "react-hook-form";
import { LoginTestingModeValues } from "@/schemas/authTestingModeSchema";
import { authApi } from "@/api/auth.api";

export async function authTestingModeSubmitHandler(
  data: LoginTestingModeValues,
  clearErrors: () => void,
  setError: UseFormSetError<LoginTestingModeValues>,
) {
  try {
    clearErrors();
    
    const response = await authApi.loginTestingMode(data.password);
    
    const json = await response.json();

    if (json.ok) return window.location.href = "/";

    const message = json.error || "AUTHENTICATION_PROBLEM";

    if (message) return setError("password", { message });
  } catch {
    setError("root", { message: "GENERIC" });
  }
}