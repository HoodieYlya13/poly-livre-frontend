"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "../UI/shared/elements/Input";
import Button from "../UI/shared/elements/Button";
import Form from "../UI/shared/components/Form";
import { useAuthMagicLinkForm } from "@/hooks/authMagicLinkForm/authMagicLinkForm";
import { authSubmitHandler } from "@/utils/auth/authSubmitHandler";
import { handlePasskeyLogin } from "@/utils/auth/handlePasskeyLogin";

export default function Auth() {
  const t = useTranslations("AUTH");
  const form = useAuthMagicLinkForm();

  const [loading, setLoading] = useState(false);
  const [successText, setSuccessText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  return (
    <div className="flex w-full grow justify-center items-center py-4">
      <Form
        handleSubmit={form.handleSubmit(async (data) => {
          await authSubmitHandler(
            data,
            form.clearErrors,
            form.setError,
            setSuccessText
          );
        })}
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
            onClick={() =>
              handlePasskeyLogin(setLoading, setErrorText, setSuccessText)
            }
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

          <Input
            id="email"
            type="email"
            label={t("EMAIL_LABEL")}
            {...form.register("email")}
            focusOnMount
            error={form.formState.errors.email?.message}
          />
        </div>
      </Form>
    </div>
  );
}
