"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "../../UI/shared/elements/Input";
import Button from "../../UI/shared/elements/Button";
import Form from "../../UI/shared/elements/Form";
import { useAuthMagicLinkForm } from "@/hooks/forms/useAuthMagicLinkForm";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginMagicLinkAction } from "@/actions/auth/magic-link/login.magic.link.actions";
import { loginPasskeyAction } from "@/actions/auth/passkey/client.paskey.actions";
import { useErrors } from "@/hooks/useErrors";
import { useCommon } from "@/hooks/useCommon";
import { useFormState, useWatch } from "react-hook-form";
import { tryCatch } from "@/utils/errors.utils";
import { TESTING_MODE } from "@/utils/config/config.client";
import { getEmailProvider } from "@/utils/utils";

export default function Auth() {
  const t = useTranslations("AUTH");
  const { errorT } = useErrors();
  const { commonT } = useCommon();
  const form = useAuthMagicLinkForm();
  const router = useRouter();

  const [isPasskeyLogin, setIsPasskeyLogin] = useState(false);
  const [emailProviderLink, setEmailProviderLink] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [successText, setSuccessText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const { handleSubmit, register, control, setError, clearErrors } = form;
  const { errors } = useFormState({ control });
  const values = useWatch({ control });

  const emailProviderLinkMemo = getEmailProvider(values.email);

  const onPasskeySubmit = async () => {
    const [error, username] = await tryCatch(loginPasskeyAction());

    setLoading(false);

    if (error)
      return setErrorText(error.message), toast.error(errorT(error.message));

    router.push("/profile");
    toast.success(commonT("HELLO", username ?? ""));
  };

  const onPasskeyLogin = () => {
    setIsPasskeyLogin(true);
    setEmailProviderLink(null);
    setErrorText(null);
    clearErrors();
    setSuccessText(null);
    setLoading(true);
    onPasskeySubmit();
  };

  const onMagicLinkSubmit = async (data: { email: string }) => {
    const [error] = await tryCatch(loginMagicLinkAction(data.email));

    if (error) return setError("root", { message: error.message });

    if (TESTING_MODE)
      setEmailProviderLink({ name: "Test", url: "http://localhost:8025/" });

    setSuccessText(t("MAGIC_LINK_SENT"));
  };

  const onMagicLinkLogin = (e: React.FormEvent<HTMLFormElement>) => {
    setIsPasskeyLogin(false);
    setEmailProviderLink(emailProviderLinkMemo);
    clearErrors();
    setErrorText(null);
    setSuccessText(null);
    handleSubmit(onMagicLinkSubmit)(e);
  };

  return (
    <div className="flex w-full grow justify-center items-center p-5 md:p-10">
      <Form
        form={form}
        handleSubmit={onMagicLinkLogin}
        buttonLabel={t("SEND_MAGIC_LINK")}
        successText={successText}
        className="max-w-md sm:max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center">{t("LOGIN_TITLE")}</h2>
        <div className="flex flex-col gap-4">
          <Button
            onClick={onPasskeyLogin}
            type="button"
            disabled={loading}
            child={loading ? commonT("") : t("SIGN_IN_PASSKEY")}
            secondary
          />
          {errorText && (
            <p className="ml-1 sm:ml-2 mt-1 text-xs sm:text-sm md:text-base text-red-500">
              {errorT(errorText)}
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
              {...register("email")}
              error={errors.email?.message && errorT(errors.email?.message)}
              autoComplete="email"
              focusOnMount
              secondary
            />

            {/* TODO: Maybe use <Activity /> component ? */}
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
