import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HOME_PAGE");

  return (
    <div className="flex grow flex-col items-center justify-center pt-20 font-normal">
      <div className="w-full flex flex-row gap-5">
        <div className="w-full lg:w-1/2 flex flex-col gap-5 justify-center p-16 md:p-24 lg:p-32">
          <h1 className="text-5xl font-bold">
            {t.rich("HERO.TITLE", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-lg">{t("HERO.DESCRIPTION")}</p>

          <div className="flex flex-row gap-5">
            <Link href="/catalog" className="bg-primary text-white px-5 py-2 rounded min-w-52 w-2/5 max-w-60 text-center">
              {t("HERO.DISCOVER_CATALOG")}
            </Link>

            <Link href="/profile/add-book" className="border border-foreground px-5 py-2 rounded min-w-52 w-2/5 max-w-60 text-center">
              {t("HERO.PROPOSE_BOOK")}
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center hidden lg:block">
          <Image
            src="/img/woman_studying.png"
            alt={t("HERO.IMAGE_ALT")}
            width={2000}
            height={2000}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
