import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
import {
  UseFormReturn,
  FieldValues,
  useWatch,
  useFormState,
} from "react-hook-form";
import { toast } from "sonner";
import { useErrors } from "@/hooks/useErrors";
import { useCommon } from "@/hooks/useCommon";
import Modal from "./Modal";
import clsx from "clsx";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
  successText: string | null;
  className?: string;
  modal?: {
    isOpen: boolean;
    onClose: () => void;
    ariaLabel: string;
  };
  bottom?: {
    children: React.ReactNode;
    separation?: boolean;
    onClick?: () => void;
  };
}

export default function Form<T extends FieldValues>({
  children,
  form,
  handleSubmit,
  buttonLabel,
  successText,
  className,
  modal,
  bottom,
}: FormProps<T>) {
  const { errorT } = useErrors();
  const { commonT } = useCommon();
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const { control } = form;
  const { isSubmitting, isSubmitted, errors, isValid } = useFormState({
    control,
  });
  const values = useWatch({ control });

  const rootErrors = errors.root?.message;

  const buttonError = isSubmitted && !isValid && !rootErrors && !successText;

  const isFormEmpty = Object.values(values || {}).every((value) => !value);

  const buttonDisabled =
    isSubmitting || isFormEmpty || buttonError || isCoolingDown;

  useEffect(() => {
    if (rootErrors) toast.error(errorT(rootErrors));
  }, [rootErrors, errorT]);

  useEffect(() => {
    if (successText) {
      toast.success(successText);
      modal?.onClose();
    }
  }, [successText, modal]);

  const handleSubmitWithCooldown = (e: React.FormEvent<HTMLFormElement>) => {
    if (isCoolingDown) return e.preventDefault();
    setIsCoolingDown(true);
    setTimeout(() => {
      setIsCoolingDown(false);
    }, 1000);
    handleSubmit(e);
  };

  // TODO: use a utility function
  const baseClasses = clsx(
    "flex flex-col p-8 sm:p-10 md:p-12 rounded-4xl sm:rounded-[3rem] md:rounded-[3.5rem] w-full gap-6 z-10 @container",
    className,
  );

  const modalClasses =
    "liquid-glass relative animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2 max-w-md sm:max-w-lg md:max-w-xl custom-shadow";

  const formClasses = modal ? `${baseClasses} ${modalClasses}` : baseClasses;

  const formContent = (
    <form onSubmit={handleSubmitWithCooldown} className={formClasses}>
      {children}

      {bottom?.children && rootErrors && (
        <p className="text-red-500 text-shadow-md">{errorT(rootErrors)}</p>
      )}

      <div className="flex flex-col gap-2">
        {bottom?.separation && (
          <div className="w-full border-t border-foreground pb-4" />
        )}

        <div className="flex flex-col @md:flex-row gap-2 items-center justify-center">
          {bottom?.children}

          <Button
            type="submit"
            disabled={buttonDisabled}
            error={buttonError}
            child={isSubmitting ? commonT("") : buttonLabel}
            className={clsx(
              bottom?.children ? "w-full @md:w-fit ml-auto" : "w-full",
            )}
          />
        </div>

        {!bottom?.children && rootErrors && (
          <p className="text-red-500 text-shadow-md">{errorT(rootErrors)}</p>
        )}
      </div>
    </form>
  );

  if (modal) {
    return (
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        ariaLabel={modal.ariaLabel}
        childrenOnly
      >
        {formContent}
      </Modal>
    );
  }

  return formContent;
}
