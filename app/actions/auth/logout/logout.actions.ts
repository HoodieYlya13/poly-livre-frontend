"use server";

import { deleteServerUserCookies } from "@/utils/cookies/server/cookiesServer";
import { getUserAccessToken } from "../../../../utils/cookies/server/getUserAccessToken";
import { checkRateLimit } from "@/utils/rateLimit";

export async function logoutAction() {
  await checkRateLimit("authLogout");

  const userAccessToken = await getUserAccessToken();

  if (userAccessToken) // TODO: delete the cookie in the backend too

  await deleteServerUserCookies();
}
