import { getServerCookie } from "./cookiesServer";
import { DEFAULT_LOCALE_UPPERCASE, LocaleLanguages, LocaleLanguagesUpperCase } from "@/i18n/utils";
import { DEFAULT_LOCALE } from "@/utils/constants";

export async function getPreferredLocale(toUpperCase = false) {
  const locale = await getServerCookie("preferred_locale");
  return toUpperCase
    ? ((locale?.toUpperCase() || DEFAULT_LOCALE_UPPERCASE) as LocaleLanguagesUpperCase)
    : ((locale || DEFAULT_LOCALE) as LocaleLanguages);
}