import { UseFormSetError } from "react-hook-form";
import { UpdateUsernameValues } from "@/schemas/updateUsernameFormSchema";
import { setClientCookie } from "../cookies/client/cookiesClient";
import { userApi } from "@/api/user.api";

export async function updateUsername(
  token: string,
  username: string,
  clearErrors: () => void,
  setError: UseFormSetError<UpdateUsernameValues>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  try {
    clearErrors();

    const json = await userApi.updateUsername(username, token);

    if (!json.username)
      return setError("root", { message: "USERNAME_UPDATE_FAILED" });

    setClientCookie("user_name", json.username, {
      maxAge: json.expiresIn,
    });

    setSuccessText("USERNAME_UPDATED");
    return true;
  } catch {
    setError("root", { message: "GENERIC" });
    return false;
  }
}

export async function getUser(token: string) {
  try {
    const json = await userApi.getMe(token);
    return json;
  } catch {
    return null;
  }
}
