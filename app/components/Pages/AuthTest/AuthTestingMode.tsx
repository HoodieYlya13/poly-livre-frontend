"use client";

import { useTranslations } from "next-intl";
import SignInTestingMode from "./shared/SignInTestingMode";
import Form from "../../UI/shared/components/Form";
import { useAuthTestingModeForm } from "@/hooks/forms/useAuthTestingModeForm";
import { authTestingModeSubmitHandler } from "@/utils/authTestingMode/authTestingModeSubmitHandler";

export default function AuthTestingMode() {
  const t = useTranslations("AUTH");
  const form = useAuthTestingModeForm();

  return (
    <section className="flex flex-1 w-full items-center justify-center p-4">
      <Form
        form={form}
        handleSubmit={form.handleSubmit(async (data) => {
          await authTestingModeSubmitHandler(
            data,
            form.clearErrors,
            form.setError
          );
        })}
        buttonLabel={t("LOGIN")}
      >
        <SignInTestingMode
          register={form.register}
          errors={form.formState.isSubmitted ? form.formState.errors : {}}
        />
      </Form>
    </section>
  );
}