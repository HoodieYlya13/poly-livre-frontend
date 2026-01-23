import { userApi } from "@/api/user.api";
import { baseServerAction } from "../../base.server.actions";
import { getPreferredLocale } from "@/utils/cookies/cookies.server";
import { LocaleLanguages } from "@/i18n/utils";

export async function getCurrentUserAction() {
  return baseServerAction(
    "getCurrentUser",
    async () => {
      return await userApi.getMe();
    },
    {},
  );
}

export async function getTestimonialsAction() {
  return baseServerAction(
    "getTestimonials",
    async () => {
      const locale = await getPreferredLocale();
      return await userApi.getTestimonials(locale as LocaleLanguages);
    },
    {},
  );
}

