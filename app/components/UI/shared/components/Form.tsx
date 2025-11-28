import React from "react";
import { useState } from "react";
import SubmitButton from "../elements/SubmitButton";
import RootErrors from "../elements/RootErrors";

interface FormProps {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonProps: {
    label: string;
    error?: string;
    disabled?: boolean;
  };
  errors?: Partial<{
    type: string | number;

    message: string;
  }> &
    Record<string, Partial<{ type: string | number; message: string }>>;
}

export default function Form({
    children,
    handleSubmit,
    buttonProps,
    errors
}: FormProps) {
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const handleSubmitWithCooldown = (e: React.FormEvent<HTMLFormElement>) => {
    if (isCoolingDown) {
      e.preventDefault();
      return;
    }
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
        label={buttonProps.label}
        error={buttonProps.error}
        disabled={buttonProps.disabled || isCoolingDown}
      />

      {errors && <RootErrors errors={errors} />}
    </form>
  );
}