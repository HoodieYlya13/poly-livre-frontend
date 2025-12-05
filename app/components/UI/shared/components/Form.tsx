import React, { useEffect } from "react";
import { useState } from "react";
import SubmitButton from "../elements/SubmitButton";
import { useTranslations } from "next-intl";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
  successText?: string;
}

export default function Form<T extends FieldValues>({
  children,
  form,
  handleSubmit,
  buttonLabel,
  successText,
}: FormProps<T>) {
  const t = useTranslations("FORM");
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const buttonError =
    form.formState.isSubmitted &&
    Object.keys(form.formState.errors).some((k) => k !== "root")
      ? t("ERRORS.CORRECT_FIELDS_BEFORE_SUBMIT")
      : undefined;
  const buttonDisabled =
    form.formState.isSubmitting ||
    Object.values(form.watch()).every((value) => !value) ||
    (form.formState.isSubmitted &&
      Object.keys(form.formState.errors).filter((k) => k !== "root").length >
        0) ||
    isCoolingDown;
  const errors = form.formState.errors.root?.message;

  useEffect(() => {
    if (errors) toast.error(t(`ERRORS.${errors}`));
    if (successText) toast.success(successText);
  }, [errors, successText, t]);

  const handleSubmitWithCooldown = (e: React.FormEvent<HTMLFormElement>) => {
    if (isCoolingDown) return e.preventDefault();
    setIsCoolingDown(true);
    setTimeout(() => {
      setIsCoolingDown(false);
    }, 1000);
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmitWithCooldown}
      className="flex flex-col liquid-glass p-8 sm:p-10 md:p-12 rounded-4xl sm:rounded-[3rem] md:rounded-[3.5rem] shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl gap-6 z-10 custom-shadow"
    >
      {children}

      <SubmitButton
        label={form.formState.isSubmitting ? t("LOADING") : buttonLabel}
        error={buttonError}
        disabled={buttonDisabled}
      />

      {errors && (
        <p className="text-red-500 text-shadow-md">{t(`ERRORS.${errors}`)}</p>
      )}
    </form>
  );
}