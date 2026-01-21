import { userApi } from "@/api/user.api";
import { baseServerAction } from "../../base.server.actions";
import { LocaleLanguages } from "@/i18n/utils";
import { TESTIMONIALS_MOCK_EN, TESTIMONIALS_MOCK_FR } from "@/utils/mock.utils";

export async function getCurrentUserAction() {
  return baseServerAction(
    "getCurrentUser",
    async () => {
      return await userApi.getMe();
    },
    {},
  );
}

export async function getTestimonialsAction(locale: LocaleLanguages) {
  return baseServerAction(
    "getTestimonials",
    async () => {
      return locale === "fr" ? TESTIMONIALS_MOCK_FR : TESTIMONIALS_MOCK_EN;
    },
    {},
  );
}
