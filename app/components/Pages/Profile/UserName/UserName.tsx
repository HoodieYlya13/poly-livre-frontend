"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/components/UI/shared/elements/Input";
import Form from "@/app/components/UI/shared/components/Form";
import { useUpdateUsernameForm } from "@/hooks/forms/useUpdateUsernameForm";
import { useRouter } from "next/navigation";
import { updateUsernameAction } from "@/app/actions/user/user.actions";
import { useErrors } from "@/hooks/useErrors";

interface UserNameProps {
  username?: string;
}

export default function UserName({ username }: UserNameProps) {
  const t = useTranslations("PROFILE.USERNAME");
  const errorT = useErrors();
  const form = useUpdateUsernameForm(username);
  const [successText, setSuccessText] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: { username: string }) => {
      form.clearErrors();
      setSuccessText(null);
      try {
        await updateUsernameAction(data.username);
        setSuccessText("USERNAME_UPDATED");
        router.push("/profile");
      } catch (error) {
        form.setError("root", {
          message: error instanceof Error ? error.message : "GENERIC",
        });
      }
    },
    [form, router]
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
            errorT.getError(form.formState.errors.username?.message)
          }
        />
      </Form>
    </div>
  );
}
