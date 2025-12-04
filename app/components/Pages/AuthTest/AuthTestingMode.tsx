"use client";

import { useTranslations } from "next-intl";
import SignInTestingMode from "./shared/SignInTestingMode";
import Form from "../../UI/shared/components/Form";
import { useAuthTestingModeForm } from "@/hooks/forms/useAuthTestingModeForm";
import { authTestingModeSubmitHandler } from "@/utils/authTestingMode/authTestingModeSubmitHandler";

export default function AuthTestingMode() {
  const t = useTranslations('AUTH');
  const form = useAuthTestingModeForm();

  return (
    <section className="flex flex-1 w-full items-center justify-center p-4">
      <Form
        handleSubmit={form.handleSubmit(async (data) => {
          await authTestingModeSubmitHandler(
            data,
            form.clearErrors,
            form.setError
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
        errors={form.formState.errors.root}
      >
        <SignInTestingMode
          register={form.register}
          errors={form.formState.isSubmitted ? form.formState.errors : {}}
        />
      </Form>
    </section>
  );
}