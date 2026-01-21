import { userApi } from "@/api/user.api";
import { baseServerAction } from "../../base.server.actions";
import { TESTIMONIALS_MOCK_EN, TESTIMONIALS_MOCK_FR } from "@/utils/mock.utils";
import { getPreferredLocale } from "@/utils/cookies/cookies.server";

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
      return locale === "fr" ? TESTIMONIALS_MOCK_FR : TESTIMONIALS_MOCK_EN;
    },
    {},
  );
}
