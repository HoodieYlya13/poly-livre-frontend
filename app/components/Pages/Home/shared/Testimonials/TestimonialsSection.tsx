import { useTranslations } from "next-intl";
import TestimonialTiles from "./TestimonialTiles";

export default function TestimonialsSection() {
  const t = useTranslations("HOME_PAGE.TESTIMONIALS");

  return (
    <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10 mb-16 mt-16">
      <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

      <TestimonialTiles />
    </section>
  );
}
