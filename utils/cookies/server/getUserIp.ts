import { getServerCookie } from "./cookiesServer";

export async function getUserIp(): Promise<string | undefined> {
  return getServerCookie("user_ip");
}
