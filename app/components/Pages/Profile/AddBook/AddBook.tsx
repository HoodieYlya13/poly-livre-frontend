"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import Form from "@/app/components/UI/shared/elements/Form";
import Button from "@/app/components/UI/shared/elements/Button";
import Input from "@/app/components/UI/shared/elements/Input";
import Select from "@/app/components/UI/shared/elements/Select";
import Modal from "@/app/components/UI/shared/elements/Modal";
import { useErrors } from "@/hooks/useErrors";
import { useRouter } from "next/navigation";
import { addBookAction } from "@/actions/book/book.actions";
import { toast } from "sonner";
import { BookFormValues } from "@/models/book.models";

export default function AddBook() {
  const t = useTranslations("ADD_BOOK");
  const { errorT } = useErrors();
  const router = useRouter();

  const form = useForm<BookFormValues>();
  const [showSuccess, setShowSuccess] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: BookFormValues) => {
    const formData = new FormData();

    if (data.cover && data.cover[0]) formData.append("cover", data.cover[0]);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    const styles = data.category ? [data.category] : data.styles ?? [];
    formData.append("styles", JSON.stringify(styles));

    const year = data.publishDate
      ? new Date(data.publishDate).getFullYear()
      : new Date().getFullYear();
    formData.append(
      "information.pages",
      String(data.information?.pages ?? "")
    );
    formData.append("information.year", String(year));
    if (data.information?.language)
      formData.append("information.language", String(data.information.language));
    formData.append(
      "information.delivery",
      String(data.information?.delivery ?? "FREE")
    );

    const loanDuration =
      typeof data.loanDuration === "string"
        ? parseInt(data.loanDuration, 10)
        : data.loanDuration;
    formData.append("loanDuration", String(loanDuration || 0));

    try {
      const result = await addBookAction(formData);
      if (result) setShowSuccess(true);
    } catch (error) {
      toast.error("Failed to add book. Please try again.");
      console.error("Error adding book:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    form.resetField("cover");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        handleSubmit={form.handleSubmit(onSubmit)}
        buttonLabel={t("PUBLISH_BOOK")}
        successText={null}
        className="p-4 sm:p-6 md:p-8 border border-gray-300 rounded-xl shadow-sm mt-6 sm:mt-8"
        bottom={{
          children: (
            <div className="w-full flex justify-end">
              <Button
                child={t("CANCEL")}
                secondary
                onClick={() => router.push("/")}
              />
            </div>
          ),
        }}
      >
        <div className="mt-6 sm:mt-8">
          <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            {t("BOOK_INFORMATION")}
          </h2>

          <label className="flex items-center justify-between border border-gray-300 rounded-lg px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-50">
            <span className="font-normal text-gray-500 text-sm sm:text-base">
              {t("UPLOAD_IMAGE")}
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...form.register("cover", { required: true })}
              ref={(e) => {
                form.register("cover").ref(e);
                fileInputRef.current = e;
              }}
              onChange={handleImageChange}
            />
          </label>

          {form.formState.errors.cover && (
            <p className="text-red-500 text-sm mt-1">{t("IMAGE_REQUIRED")}</p>
          )}

          {imagePreview && (
            <div className="relative mt-4 w-fit">
              <Image
                src={imagePreview}
                alt="Preview"
                width={180}
                height={180}
                className="rounded-lg object-cover w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                aria-label={t("REMOVE_IMAGE")}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
          <Input
            id="title"
            type="text"
            label={t("BOOK_TITLE")}
            required
            error={
              form.formState.errors.title?.message &&
              errorT(form.formState.errors.title?.message)
            }
            {...form.register("title")}
            secondary
          />

          <Input
            id="pages"
            type="number"
            label={t("PAGES")}
            required
            error={
              form.formState.errors.information?.pages?.message &&
              errorT(
                form.formState.errors.information?.pages?.message
              )
            }
            {...form.register("information.pages", {
              required: true,
              valueAsNumber: true,
            })}
            secondary
          />

          <Input
            id="author"
            type="text"
            label={t("AUTHOR")}
            required
            error={
              form.formState.errors.author?.message &&
              errorT(form.formState.errors.author?.message)
            }
            {...form.register("author")}
            secondary
          />

          <Input
            id="publishDate"
            type="date"
            label={t("PUBLISH_DATE")}
            required
            error={
              form.formState.errors.publishDate?.message &&
              errorT(form.formState.errors.publishDate?.message)
            }
            {...form.register("publishDate", { required: true })}
            secondary
          />

          <Select
            id="category"
            label={t("CATEGORY")}
            error={form.formState.errors.category}
            {...form.register("category", { required: true })}
            options={t.raw("CATEGORIES_OPTIONS")}
            secondary
          />

          <Select
            id="language"
            label={t("LANGUAGE")}
            error={form.formState.errors.information?.language}
            {...form.register("information.language", { required: true })}
            options={t.raw("LANGUAGES_OPTIONS")}
            secondary
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">
            {t("DESCRIPTION")}
          </label>
          <textarea
            rows={3}
            {...form.register("description", { required: true })}
            className={`w-full border rounded-lg px-3 sm:px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm sm:text-base ${
              form.formState.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">{t("FIELD_REQUIRED")}</p>
          )}
        </div>

        <div className="mt-4 sm:mt-6">
          <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            {t("SALES_OPTIONS")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Input
              id="price"
              type="number"
              label={t("PRICE_EUR")}
              required
              error={
                form.formState.errors.price?.message &&
                errorT(form.formState.errors.price?.message)
              }
              {...form.register("price", {
                required: true,
                valueAsNumber: true,
              })}
              secondary
            />

            <Select
              id="duration"
              label={t("RENTAL_DURATION")}
              error={form.formState.errors.loanDuration}
              {...form.register("loanDuration", { required: true })}
              options={t.raw("RENTAL_DURATION_OPTIONS")}
              secondary
            />
          </div>
        </div>
      </Form>

      
      <Modal
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
          <h2 className="text-xl font-bold mb-2 text-center">{t("BOOK_PUBLISHED_SUCCESS")}</h2>
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
      </Modal>
    </div>
  );
}
