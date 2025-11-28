import { LocaleLanguagesUpperCase } from "@/i18n/utils";
import { getServerCookie } from "./cookiesServer";

export async function getUserCountryServer() {
  const country = await getServerCookie("user_country");

  if (!country || country === "unknown") return undefined;

  return country as LocaleLanguagesUpperCase;
}
