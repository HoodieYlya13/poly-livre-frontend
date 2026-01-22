import { baseServerAction } from "@/actions/base.server.actions";
import { authApi } from "@/api/auth.api";
import { TokenSchema } from "@/schemas/stringSchemas";
import { setUserSessionCookies } from "@/utils/cookies/cookies.server";

export async function verifyMagicLinkAction(token: string) {
  return baseServerAction(
    "authVerifyMagicLink",
    async () => {
      const validationResult = TokenSchema.safeParse({ token });

      if (!validationResult.success) throw new Error();

      const user = await authApi.verifyMagicLink(validationResult.data.token);

      await setUserSessionCookies(user);

      return user.username;
    },
    {},
  );
}
