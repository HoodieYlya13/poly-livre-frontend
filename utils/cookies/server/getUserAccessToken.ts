import { getServerCookie } from "./cookiesServer";

export async function getUserAccessToken(): Promise<string | undefined> {
  const userAccessToken = await getServerCookie("user_access_token");

  return userAccessToken;
}
