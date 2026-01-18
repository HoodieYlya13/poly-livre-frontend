import { APP_NAME } from "@/utils/config/config.client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import NewsletterForm from "./shared/NewsletterForm";

export default function Footer() {
  const t = useTranslations("FOOTER");

  return (
    <footer className="w-full flex flex-col gap-10 items-center flex px-5 pb-10 md:px-10 shadow-[0_-25px_50px_-12px_rgb(0_0_0/0.25)] bg-secondary/50 font-normal">
      <div className="w-[clamp(20rem,60%,100%)] max-w-full border border-2 border-primary" />

      <section className="w-full flex flex-col gap-2 items-center text-center justify-center">
        <h2 className="font-bold text-xl max-w-1/2">
          Restez informé des nouveautés
        </h2>

        <p className="text-xs max-w-72">
          Recevez chaque semaine des recommandations et un accès anticipé
          exclusif aux nouveautés.
        </p>

        <NewsletterForm />
      </section>

      <div className="w-full border-t border-primary/50" />

      <section className="w-full flex flex-col sm:flex-row gap-5 justify-center sm:justify-between items-center">
        <div className="flex gap-5">
          <Link href="/terms">{t("TERMS")}</Link>
          <Link href="/contact">{t("CONTACT")}</Link>
          <Link href="/help">{t("HELP")}</Link>
        </div>

        <div>
          {t.rich("COPYRIGHT", {
            year: new Date().getFullYear(),
            appName: APP_NAME,
            bold: (chunks) => <b>{chunks}</b>,
          })}
        </div>
      </section>
    </footer>
  );
}
