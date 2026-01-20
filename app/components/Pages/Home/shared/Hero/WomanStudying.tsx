import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WomanStudying() {
  const t = useTranslations("HOME_PAGE");

  return (
    <div className="w-1/2 items-center justify-center hidden md:flex">
      <Image
        src="/img/woman_studying.png"
        alt={t("HERO.IMAGE_ALT")}
        width={2000}
        height={2000}
        className="w-full h-auto"
        priority
      />    
    </div>
  );
}
