import ReviewTile from "@/app/components/UI/shared/components/ReviewTile";
import { useTranslations } from "next-intl";

export default function ReviewsSection() {
  const t = useTranslations("HOME_PAGE.REVIEWS");
  return (
    <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10">
      <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

      <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
        <ReviewTile />
        <ReviewTile />
        <ReviewTile />
      </div>
    </section>
  );
}
