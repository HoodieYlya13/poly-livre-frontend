"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/components/UI/shared/elements/Input";
import Form from "@/app/components/UI/shared/elements/Form";
import { useRouter } from "next/navigation";
import { useErrors } from "@/hooks/useErrors";
import { useAuth } from "@/hooks/useAuth";
import { useFormState } from "react-hook-form";
import { tryCatch } from "@/utils/errors.utils";
import { AddBookValues } from "@/schemas/addBookSchema";
import Select from "@/app/components/UI/shared/elements/Select";
import { addBookAction } from "@/actions/book/book.actions";
import { useAddBookForm } from "@/hooks/forms/useAddBookForm";

export default function AddBook() {
  const t = useTranslations("ADD_BOOK");
  const { errorT } = useErrors();
  const form = useAddBookForm();
  const [successText, setSuccessText] = useState<string | null>(null);
  const router = useRouter();
  const { shouldReconnect } = useAuth();

  const { handleSubmit, register, control, setError, clearErrors } = form;
  const { errors } = useFormState({ control });

  const onSubmit = async (data: AddBookValues) => {
    clearErrors();
    setSuccessText(null);

    const [error] = await tryCatch(addBookAction(data));

    if (error) {
      setError("root", { message: error.message });

      shouldReconnect(error);

      return;
    }

    setSuccessText(t("BOOK_PUBLISHED_SUCCESS"));
    router.push("/");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        {t("TITLE")}
      </h1>
      <p className="mt-4 text-center text-xs sm:text-sm font-normal">
        {t("DESCRIPTION_FORM")}
      </p>

      <Form
        form={form}
        handleSubmit={handleSubmit(onSubmit)}
        buttonLabel={t("PUBLISH_BOOK")}
        successText={successText}
        className="p-4 sm:p-6 md:p-8 border border-gray-300 rounded-xl shadow-sm mt-6 sm:mt-8"
      >
        <h3 className="text-lg font-bold">{t("TITLE")}</h3>
        <p className="text-sm text-gray-400">{t("DESCRIPTION_FORM")}</p>

        <Input
          id="title"
          label={t("BOOK_TITLE")}
          type="text"
          {...register("title")}
          secondary
          focusOnMount
          error={errors.title?.message && errorT(errors.title?.message)}
        />

        <Input
          id="pages"
          label={t("PAGES")}
          type="number"
          secondary
          {...register("pages")}
          error={errors.pages?.message && errorT(errors.pages?.message)}
        />

        <Input
          id="author"
          label={t("AUTHOR")}
          type="text"
          secondary
          {...register("author")}
          error={errors.author?.message && errorT(errors.author?.message)}
        />

        <Input
          id="year"
          label={t("YEAR_LABEL")}
          type="number"
          secondary
          {...register("year")}
          error={errors.year?.message && errorT(errors.year?.message)}
        />

        <Select
          id="style"
          label={t("CATEGORY")}
          {...register("style")}
          secondary
          options={t.raw("CATEGORIES_OPTIONS")}
          error={errors.style}
        />

        <Select
          id="language"
          label={t("LANGUAGE")}
          secondary
          {...register("language")}
          options={t.raw("LANGUAGE_OPTIONS")}
          error={errors.language}
        />

        {/* TODO: add inside Input component */}
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium">
            {t("DESCRIPTION_FORM")}
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            className={`w-full border rounded-lg px-3 sm:px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm sm:text-base ${
              form.formState.errors.description
                ? "border-red-500"
                : "border-foreground/50"
            }`}
          />
          {errors.description?.message && (
            <p className="ml-1 sm:ml-2 mt-1 text-xs sm:text-sm md:text-base text-red-500">
              {errorT(errors.description?.message)}
            </p>
          )}
        </div>

        <Input
          id="price"
          label={t("PRICE_EUR")}
          type="number"
          secondary
          {...register("price")}
          error={errors.price?.message && errorT(errors.price?.message)}
        />

        <Input
          id="loanDuration"
          label={t("LOAN_DURATION_LABEL")}
          type="number"
          secondary
          {...register("loanDuration")}
          error={
            errors.loanDuration?.message && errorT(errors.loanDuration?.message)
          }
        />
      </Form>

      {/* <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        ariaLabel="Book published successfully"
        childrenOnly
      >
        <div className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[80vh] overflow-auto">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
              <svg
                className="w-10 h-10 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12l2 2l4-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">
            {t("BOOK_PUBLISHED_SUCCESS")}
          </h2>
          <p className="text-center mb-6">
            {t("BOOK_PUBLISHED_SUCCESS_DESCRIPTION")}
          </p>
          <Button
            child={t("FINISH")}
            onClick={() => {
              setShowSuccess(false);
              router.push("/");
            }}
            className="w-full"
          />
        </div>
      </Modal> */}
    </div>
  );
}
