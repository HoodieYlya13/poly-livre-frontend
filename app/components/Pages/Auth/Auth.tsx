"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "../../UI/shared/elements/Input";
import Button from "../../UI/shared/elements/Button";
import Form from "../../UI/shared/components/Form";
import { useAuthMagicLinkForm } from "@/hooks/authMagicLinkForm/authMagicLinkForm";
import { authSubmitHandler } from "@/utils/auth/magicLink/authSubmitHandler";
import { handlePasskeyLogin } from "@/utils/auth/passkey/handlePasskeyLogin";
import Link from "next/link";

export default function Auth() {
  const t = useTranslations("AUTH");
  const form = useAuthMagicLinkForm();

  const [isPasskeyLogin, setIsPasskeyLogin] = useState(false);
  const [emailProviderLink, setEmailProviderLink] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [successText, setSuccessText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const emailProviderLinkMemo = useMemo(() => {
    const email = form.watch("email");
    if (!email) return null;

    const domainParts = email.split("@")[1]?.toLowerCase().split(".");
    if (!domainParts || domainParts.length < 2) return null;

    const tld = domainParts.slice(1).join(".");
    const providerName = domainParts[0];

    const map: Record<
      string,
      { name: string; url?: string; getUrl?: (tld: string) => string }
    > = {
      gmail: { name: "Gmail", url: "https://mail.google.com" },
      yahoo: {
        name: "Yahoo Mail",
        getUrl: (tld) => `https://mail.yahoo.${tld}`,
      },
      hotmail: { name: "Outlook", url: "https://outlook.live.com" },
      outlook: { name: "Outlook", url: "https://outlook.live.com" },
      live: { name: "Outlook", url: "https://outlook.live.com" },
      icloud: { name: "iCloud Mail", url: "https://www.icloud.com/mail" },
      orange: {
        name: "Orange Mail",
        getUrl: (tld) => `https://messagerie.orange.${tld}`,
      },
      sfr: { name: "SFR Mail", getUrl: (tld) => `https://webmail.sfr.${tld}` },
      laposte: {
        name: "La Poste Mail",
        url: "https://www.laposte.net/accueil",
      },
      free: {
        name: "Free Mail",
        getUrl: (tld) => `https://webmail.free.${tld}`,
      },
      proton: {
        name: "Proton Mail",
        url: "https://account.proton.me/",
      },
    };

    const provider = map[providerName];
    if (!provider) return null;

    return {
      name: provider.name,
      url: provider.getUrl ? provider.getUrl(tld) : provider.url!,
    };
  }, [form]);

  return (
    <div className="flex w-full grow justify-center items-center py-4">
      <Form
        handleSubmit={(e) => {
          setIsPasskeyLogin(false);
          setEmailProviderLink(emailProviderLinkMemo);
          form.handleSubmit(async (data) => {
            await authSubmitHandler(
              data,
              form.clearErrors,
              form.setError,
              setSuccessText
            );
          })(e);
        }}
        buttonProps={{
          label: t(form.formState.isSubmitting ? "LOADING" : "LOGIN"),
          error:
            form.formState.isSubmitted &&
            Object.keys(form.formState.errors).some((k) => k !== "root")
              ? t("ERRORS.CORRECT_FIELDS_BEFORE_SUBMIT")
              : undefined,
          disabled:
            form.formState.isSubmitting ||
            Object.values(form.watch()).every((value) => !value) ||
            (form.formState.isSubmitted &&
              Object.keys(form.formState.errors).filter((k) => k !== "root")
                .length > 0),
        }}
        successText={successText ? t(successText) : undefined}
        errors={form.formState.errors.root}
      >
        <h2 className="text-2xl font-bold text-center">{t("LOGIN_TITLE")}</h2>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => {
              setIsPasskeyLogin(true);
              setEmailProviderLink(null);
              handlePasskeyLogin(setLoading, setErrorText, setSuccessText);
            }}
            type="button"
            disabled={loading}
            child={loading ? t("LOADING") : t("SIGN_IN_PASSKEY")}
          />
          {errorText && (
            <p className="ml-1 sm:ml-2 mt-1 text-xs sm:text-sm md:text-base text-red-500">
              {t(`ERRORS.${errorText}`)}
            </p>
          )}

          <div className="inline-flex items-center justify-center my-4">
            <div className="w-full border-t border-gray-700" />
            <div className="w-full px-4 text-sm text-gray-500 text-center">
              {t("OR")}
            </div>
            <div className="w-full border-t border-gray-700" />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              id="email"
              type="email"
              label={t("EMAIL_LABEL")}
              {...form.register("email")}
              focusOnMount
              error={form.formState.errors.email?.message}
            />

            {!isPasskeyLogin && successText && emailProviderLink && (
              <p className="text-sm text-dark mt-2">
                {t("CHECK_YOUR_EMAIL")}{" "}
                <Link
                  href={emailProviderLink.url}
                  target="_blank"
                  className="underline"
                >
                  {emailProviderLink.name}
                </Link>
              </p>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}