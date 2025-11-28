import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HOME_PAGE");

  return (
    <div className="flex grow flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-semibold">
        {t("META.TITLE", { name: "PolyLivre" })}
      </h1>
    </div>
  );
}