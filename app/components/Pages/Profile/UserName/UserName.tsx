"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/components/UI/shared/elements/Input";
import Form from "@/app/components/UI/shared/components/Form";
import { useUpdateUsernameForm } from "@/hooks/forms/useUpdateUsernameForm";
import { updateUsername } from "@/utils/profile/user";
import { useRouter } from "next/navigation";

interface UserNameProps {
  token: string;
  username?: string;
}

export default function UserName({ token, username }: UserNameProps) {
  const t = useTranslations("PROFILE.USERNAME");
  const form = useUpdateUsernameForm(username);
  const [successText, setSuccessText] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: { username: string }) => {
      const success = await updateUsername(
        token,
        data.username,
        form.clearErrors,
        form.setError,
        setSuccessText
      );
      if (success) router.push("/profile");
    },
    [token, form.clearErrors, form.setError, router]
  );

  return (
    <div className="flex w-full grow justify-center items-center py-4">
      <Form
        form={form}
        handleSubmit={form.handleSubmit(onSubmit)}
        buttonLabel={t("UPDATE")}
        successText={successText ? t(successText) : undefined}
      >
        <h3 className="text-lg font-bold">{t("TITLE")}</h3>
        <p className="text-sm text-gray-400">{t("DESCRIPTION")}</p>

        <Input
          id="username"
          label={t("NAME_LABEL")}
          type="text"
          {...form.register("username")}
          focusOnMount
          error={
            form.formState.errors.username?.message &&
            t(form.formState.errors.username?.message)
          }
        />
      </Form>
    </div>
  );
}
