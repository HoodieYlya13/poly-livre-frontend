import { useTranslations } from "next-intl";

export default function BusinessModelDescription() {
  const t = useTranslations("HOME_PAGE.HOW_IT_WORKS");

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

      <p className="text-center whitespace-pre-line text-xs xs:text-sm sm:text-base">
        {t("DESCRIPTION")}
      </p>
    </div>
  );
}
