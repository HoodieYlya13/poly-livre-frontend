import { APP_NAME } from "@/utils/config/config.client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import NewsletterForm from "./shared/NewsletterForm";
import Logo from "../../shared/elements/SVGs/Logo";
import Icon from "../../shared/elements/SVGs/Icon";

export default function Footer() {
  const t = useTranslations("FOOTER");

  return (
    <footer className="w-full flex flex-col gap-10 items-center flex px-5 pb-10 md:px-10 shadow-[0_-25px_50px_-12px_rgb(0_0_0/0.25)] bg-secondary/50 font-normal">
      <div className="w-[clamp(20rem,60%,25rem)] max-w-full border border-2 border-primary" />

      <section className="w-full flex flex-col gap-2 items-center text-center justify-center">
        <h2 className="font-bold text-xl max-w-1/2">{t("NEWSLETTER.TITLE")}</h2>

        <p className="text-xs max-w-72">{t("NEWSLETTER.DESCRIPTION")}</p>

        <NewsletterForm />
      </section>

      <div className="w-full border-t border-primary/50" />

      <section className="w-full flex flex-col sm:flex-row gap-5 justify-center sm:justify-between items-center text-sm">
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <div className="flex flex-col md:flex-row-reverse gap-5 w-full">
            <div className="flex flex-wrap md:flex-nowrap gap-5 items-start justify-between max-w-xl">
              <div className="flex flex-col gap-2 whitespace-nowrap">
                <Link href="/" className="text-primary">
                  {APP_NAME}
                </Link>

                <Link href="/blog">{t("LINKS.BLOG")}</Link>
                <Link href="/about-us">{t("LINKS.ABOUT_US")}</Link>
              </div>

              <div className="flex flex-col gap-2 whitespace-nowrap">
                <Link href="/client-support" className="text-primary">
                  {t("LINKS.CLIENT_SUPPORT")}
                </Link>

                <Link href="/help">{t("LINKS.HELP_CENTER")}</Link>
                <Link href="/contact">{t("LINKS.CONTACT_US")}</Link>
                <Link href="/qa">{t("LINKS.FAQS")}</Link>
              </div>

              <div className="flex flex-col gap-2 whitespace-nowrap">
                <Link href="/legal" className="text-primary">
                  {t("LINKS.LEGAL")}
                </Link>

                <Link href="/privacy-policy">{t("LINKS.PRIVACY_POLICY")}</Link>
                <Link href="/cookies-policy">{t("LINKS.COOKIES_POLICY")}</Link>
                <Link href="/terms-of-use">{t("LINKS.TERMS_OF_USE")}</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start justify-center w-full font-semibold text-sm">
              <Logo
                variant="full"
                className="text-foreground h-12"
                accentClassName="text-primary"
              />

              <p className="max-w-120 font-normal">{t("BRAND_DESCRIPTION")}</p>

              <Link
                href="mailto:service.client@liprerie.com"
                className="inline-flex items-center gap-2"
              >
                <Icon name="mail" className="w-5 h-auto" />
                <p>service.client@liprerie.com</p>
              </Link>

              <Link
                href="tel:+33012345678"
                className="inline-flex items-center gap-2"
              >
                <Icon name="phone" className="w-5 h-auto" />
                <p>+33 0 12 34 56 78</p>
              </Link>
            </div>
          </div>

          <Link href="/" className="text-xs">
            {t.rich("COPYRIGHT", {
              year: new Date().getFullYear(),
              appName: APP_NAME,
              bold: (chunks) => <b>{chunks}</b>,
            })}
          </Link>
        </div>
      </section>
    </footer>
  );
}
