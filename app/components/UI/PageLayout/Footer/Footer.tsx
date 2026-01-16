import { APP_NAME } from "@/utils/config/config.client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("FOOTER");

  return (
    <footer className="w-full h-20 md:h-30 border-t liquid-glass-border-color flex px-5 md:px-10 shadow-[0_-25px_50px_-12px_rgb(0_0_0/0.25)] bg-secondary font-normal">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-5 justify-center sm:justify-between items-center">
        <div>
          {t.rich("COPYRIGHT", {
            year: new Date().getFullYear(),
            appName: APP_NAME,
            bold: (chunks) => <b>{chunks}</b>,
          })}
        </div>

        <div className="flex gap-5">
          <Link href="/terms">{t("TERMS")}</Link>
          <Link href="/contact">{t("CONTACT")}</Link>
          <Link href="/help">{t("HELP")}</Link>
        </div>
      </div>
    </footer>
  );
}
