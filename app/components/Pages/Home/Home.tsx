import { useTranslations } from "next-intl";
import Information from "./shared/Information";
import InformationTiles from "./shared/InformationTiles";
import WomanStudying from "./shared/WomanStudying";
import Image from "next/image";
import BookTile from "../../UI/shared/components/BookTile";
import ReviewTile from "../../UI/shared/components/ReviewTile";

export default function Home() {
  const t = useTranslations("HOME_PAGE.HOW_IT_WORKS");

  return (
    <div className="flex grow flex-col gap-10 items-center justify-center font-normal">
      <section className="flex md:landscape:min-h-dvh w-full pt-20">
        <div className="w-full grow flex flex-row gap-5 animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out">
          <Information />
          <WomanStudying />
        </div>
      </section>

      <section className="w-full flex flex-col gap-10 items-center justify-center px-2 xs:px-5">
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

          <p className="text-center whitespace-pre-line text-xs xs:text-sm sm:text-base">
            {t("DESCRIPTION")}
          </p>
        </div>

        <InformationTiles />
      </section>

      <section className="w-full flex flex-col gap-10 items-center justify-center px-2 xs:px-5">
        <Image
          src="/img/rocket.png"
          alt="Rocket"
          width={2000}
          height={2000}
          className="size-32"
        />

        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h2 className="font-bold text-2xl sm:text-3xl">
            En tendance sur <span className="text-primary">Liprêrie</span>
          </h2>

          <p className="text-center whitespace-pre-line text-xs xs:text-sm sm:text-base">
            Retrouvez les livres en tendance et faites votre choix selon votre
            goût de lecture !
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center">
          <BookTile />
          <BookTile />
          <BookTile />
          <BookTile />
        </div>
      </section>

      <section className="w-full flex flex-col gap-10 items-center justify-center px-2 pb-10 xs:px-5">
        <h2 className="font-bold text-2xl sm:text-3xl">
          Que disent nos lecteurs ?
        </h2>

        <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center">
          <ReviewTile />
          <ReviewTile />
          <ReviewTile />
        </div>
      </section>
    </div>
  );
}
