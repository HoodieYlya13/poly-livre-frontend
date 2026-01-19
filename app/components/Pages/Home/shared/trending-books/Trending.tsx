import { useTranslations } from "next-intl";
import { APP_NAME } from "@/utils/config/config.client";

export default function Trending() {
  const t = useTranslations("HOME_PAGE.TRENDING");

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <h2 className="font-bold text-2xl sm:text-3xl">
        {t.rich("TITLE", {
          primary: (chunks) => <span className="text-primary">{chunks}</span>,
          appName: APP_NAME,
        })}
      </h2>

      <p className="text-center whitespace-pre-line text-xs xs:text-sm sm:text-base">
        {t("DESCRIPTION")}
      </p>
    </div>
  );
}
