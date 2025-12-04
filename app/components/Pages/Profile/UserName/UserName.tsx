"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/components/UI/shared/elements/Input";
import Form from "@/app/components/UI/shared/components/Form";
import { useUpdateUsernameForm } from "@/hooks/forms/useUpdateUsernameForm";
import { updateUsername } from "@/utils/profile/user";

interface UserNameProps {
    token: string;
}

export default function UserName({ token }: UserNameProps) {
  const t = useTranslations("PROFILE.USERNAME");
  const form = useUpdateUsernameForm();
  const [successText, setSuccessText] = useState<string | null>(null);

  return (
    <div className="flex w-full grow justify-center items-center py-4">
      <Form
        handleSubmit={form.handleSubmit(async (data) => {
          await updateUsername(
            token,
            data.username,
            form.clearErrors,
            form.setError,
            setSuccessText
          );
        })}
        buttonProps={{
          label: t(form.formState.isSubmitting ? "LOADING" : "UPDATE"),
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
        <h3 className="text-lg font-bold">{t("TITLE")}</h3>
        <p className="text-sm text-gray-400">{t("DESCRIPTION")}</p>

        <Input
          id="username"
          label={t("NAME_LABEL")}
          type="text"
          {...form.register("username")}
          focusOnMount
          error={form.formState.errors.username?.message}
        />
      </Form>
    </div>
  );
}
