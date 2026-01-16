import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Information() {
  const t = useTranslations("HOME_PAGE");

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-2 lg:p-12">
      <div className="w-full flex max-w-xl @container">
        <div className="w-full flex flex-col gap-5 text-xs @sm:text-sm @md:text-base">
          <h1 className="text-3xl @xs:text-4xl @md:text-5xl font-bold">
            {t.rich("HERO.TITLE", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>

          <p className="whitespace-pre-line">{t("HERO.DESCRIPTION")}</p>

          <div className="flex flex-col @sm:flex-row gap-5">
            <Link
              href="/catalog"
              className="bg-primary text-white py-2 rounded w-full text-center"
            >
              {t("HERO.DISCOVER_CATALOG")}
            </Link>

            <Link
              href="/profile/add-book"
              className="border border-foreground py-2 rounded w-full text-center"
            >
              {t("HERO.PROPOSE_BOOK")}
            </Link>
          </div>

          <div className="flex flex-row">
            <div className="w-1/3 flex flex-col">
              <div className="h-1/2 flex items-center justify-center text-xl @lg:text-2xl font-black">
                + 20 K
              </div>
              <div className="h-1/2 flex items-center justify-center text-center">
                {t("HERO.STATS.BOOKS_AVAILABLE")}
              </div>
            </div>

            <div className="border-x w-1/3 flex flex-col">
              <div className="h-1/2 flex items-center justify-center text-xl sm:text-2xl font-black">
                30
              </div>
              <div className="h-1/2 flex items-center justify-center text-center">
                {t("HERO.STATS.READING_DAYS")}
              </div>
            </div>

            <div className="w-1/3 flex flex-col">
              <div className="h-1/2 flex items-center justify-center text-xl sm:text-2xl font-black">
                {t("HERO.STATS.FREE")}
              </div>
              <div className="h-1/2 flex items-center justify-center text-center">
                {t("HERO.STATS.DELIVERY_RETURN")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
