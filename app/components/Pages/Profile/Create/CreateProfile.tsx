"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/components/UI/shared/elements/Input";
import Form from "@/app/components/UI/shared/elements/Form";
import { useCreateProfileForm } from "@/hooks/forms/useCreateProfileForm";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/actions/user/user.actions";
import { useErrors } from "@/hooks/useErrors";
import { useAuth } from "@/hooks/useAuth";
import { useFormState } from "react-hook-form";
import { tryCatch } from "@/utils/errors.utils";
import { UserValues } from "@/schemas/userSchema";
import Select from "@/app/components/UI/shared/elements/Select";

export default function CreateProfile() {
  const t = useTranslations("PROFILE.CREATE");
  const { errorT } = useErrors();
  const form = useCreateProfileForm();
  const [successText, setSuccessText] = useState<string | null>(null);
  const router = useRouter();
  const { shouldReconnect } = useAuth();

  const { handleSubmit, register, control, setError, clearErrors } = form;
  const { errors } = useFormState({ control });

  const onSubmit = async (data: UserValues) => {
    clearErrors();
    setSuccessText(null);

    const [error] = await tryCatch(createProfileAction(data));

    if (error) {
      setError("root", { message: error.message });

      shouldReconnect(error);

      return;
    }

    setSuccessText(t("USER_CREATED"));
    router.push("/profile");
  };

  return (
    <div className="flex w-full grow justify-center items-center p-5 py-10 md:p-10">
      <Form
        form={form}
        handleSubmit={handleSubmit(onSubmit)}
        buttonLabel={t("CREATE")}
        successText={successText}
        className="max-w-md sm:max-w-lg"
      >
        <h3 className="text-lg font-bold">{t("TITLE")}</h3>
        <p className="text-sm text-gray-400">{t("DESCRIPTION")}</p>

        <Input
          id="username"
          label={t("NAME_LABEL")}
          type="text"
          {...register("username")}
          focusOnMount
          error={errors.username?.message && errorT(errors.username?.message)}
        />

        <Input
          id="firstName"
          label={t("FIRST_NAME_LABEL")}
          type="text"
          {...register("firstName")}
          error={errors.firstName?.message && errorT(errors.firstName?.message)}
        />

        <Input
          id="lastName"
          label={t("LAST_NAME_LABEL")}
          type="text"
          {...register("lastName")}
          error={errors.lastName?.message && errorT(errors.lastName?.message)}
        />

        <Select
          id="status"
          label={t("STATUS_LABEL")}
          {...register("status")}
          options={t.raw("STATUS_OPTIONS")}
          error={errors.status}
        />
      </Form>
    </div>
  );
}
