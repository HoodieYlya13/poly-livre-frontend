"use client";

import { useState } from "react";
import Input from "../../../UI/shared/elements/Input";
import { handlePasskeyRegistration } from "@/utils/auth/passkey/handlePasskeyRegistration";
import { useTranslations } from "next-intl";
import Form from "../../../UI/shared/components/Form";
import { useUpdatePasskeyNameForm } from "@/hooks/forms/useUpdatePasskeyNameForm";

interface PasskeyRegistrationProps {
  email: string;
}

export default function PasskeyRegistration({
  email,
}: PasskeyRegistrationProps) {
  const t = useTranslations("PROFILE.PASSKEY");
  const form = useUpdatePasskeyNameForm();
  const [successText, setSuccessText] = useState<string | null>(null);

  return (
    <div className="flex w-full grow justify-center items-center py-4">
      <Form
        form={form}
        handleSubmit={form.handleSubmit(async (data) => {
          await handlePasskeyRegistration(
            email,
            data.name,
            form.clearErrors,
            form.setError,
            setSuccessText
          );
        })}
        buttonLabel={t("BUTTON")}
        successText={successText ? t(successText) : undefined}
      >
        <h3 className="text-lg font-bold">{t("TITLE")}</h3>
        <p className="text-sm text-gray-400">{t("DESCRIPTION")}</p>

        <Input
          id="passkey-name"
          label={t("NAME_LABEL")}
          type="text"
          {...form.register("name")}
          focusOnMount
          error={form.formState.errors.name?.message}
        />
      </Form>
    </div>
  );
}
