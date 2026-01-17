import { useTranslations } from "next-intl";
import Information from "./shared/Information";
import InformationTiles from "./shared/InformationTiles";
import WomanStudying from "./shared/WomanStudying";

export default function Home() {
  const t = useTranslations("HOME_PAGE.HOW_IT_WORKS");

  return (
    <div className="flex grow flex-col items-center justify-center font-normal">
      <section className="flex md:landscape:min-h-dvh w-full pt-20">
        <div className="w-full grow flex flex-row gap-5 animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out">
          <Information />
          <WomanStudying />
        </div>
      </section>

      <section className="w-full flex flex-col gap-10 sm:gap-20 items-center justify-center p-2 xs:p-5">
        <div className="w-full flex flex-col gap-2 sm:gap-5 items-center justify-center">
          <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

          <p className="text-center whitespace-pre-line text-xs xs:text-sm sm:text-base">
            {t("DESCRIPTION")}
          </p>
        </div>

        <InformationTiles />
      </section>
    </div>
  );
}
