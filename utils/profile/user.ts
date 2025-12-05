import { UseFormSetError } from "react-hook-form";
import { UpdateUsernameValues } from "@/schemas/updateUsernameFormSchema";
import { setClientCookie } from "../cookies/client/cookiesClient";

export async function updateUsername(
  token: string,
  username: string,
  clearErrors: () => void,
  setError: UseFormSetError<UpdateUsernameValues>,
  setSuccessText: React.Dispatch<React.SetStateAction<string | null>>
) {
  try {
    clearErrors();

    const response = await fetch("http://localhost:8080/users/" + username, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

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
    const response = await fetch("http://localhost:8080/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json;
  } catch {
    return null;
  }
}
