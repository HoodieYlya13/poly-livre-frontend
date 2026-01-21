import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { ERROR_CODES } from "@/utils/errors.utils";
import { getServerCookie } from "@/utils/cookies/cookies.server";

export async function getUserPasskeysAction() {
  return baseServerAction(
    "getUserPasskeysAction",
    async () => {
      const userId = await getServerCookie("user_id");
      if (!userId) throw new Error(ERROR_CODES.AUTH[4]);

      return await authApi.getUserPasskeys(userId);
    },
    {}
  );
}
