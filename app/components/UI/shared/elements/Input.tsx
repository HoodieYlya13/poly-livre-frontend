import React, { forwardRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Icon from "./SVGs/Icon";

interface VisibilityButtonProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function VisibilityButton({
  showPassword,
  setShowPassword,
  inputRef,
}: VisibilityButtonProps) {
  const restoreCursorPosition = () => {
    const input = inputRef.current;
    if (!input) return setShowPassword(false);

    const position = input.selectionStart;

    setShowPassword(false);
    setTimeout(() => {
      try {
        if (position !== null) input.setSelectionRange(position, position);
        input.focus();
      } catch (e) {
        console.error("Visibility button error", e);
      }
    }, 0);
  };

  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        setShowPassword(true);
        inputRef.current?.focus();
      }}
      onMouseUp={restoreCursorPosition}
      onTouchStart={() => {
        setShowPassword(true);
        inputRef.current?.focus();
      }}
      onTouchEnd={restoreCursorPosition}
      onContextMenu={(e) => e.preventDefault()}
      className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
      tabIndex={-1}
    >
      <Icon
        name={showPassword ? "visbilityOff" : "visbility"}
        className="size-5 sm:size-6 md:size-7"
      />
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  error?: string;
  focusOnMount?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, type, error, focusOnMount = false, ...rest },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setRefs = (node: HTMLInputElement) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref)
      (ref as React.RefObject<HTMLInputElement | null>).current = node;
  };

  useEffect(() => {
    if (focusOnMount && inputRef.current) inputRef.current.focus();
  }, [focusOnMount]);

  return (
    <>
      <div className="relative input-focus-glow rounded-2xl sm:rounded-3xl md:rounded-[1.75rem]">
        <input
          {...rest}
          id={id}
          ref={setRefs}
          type={type !== "password" ? type : showPassword ? "text" : "password"}
          placeholder={label}
          className={clsx(
            "liquid-glass-backdrop liquid-glass-background border block w-full rounded-2xl sm:rounded-3xl md:rounded-[1.75rem] shadow-sm placeholder-gray-400 outline-none p-2 sm:p-3 md:p-4 transition-all duration-300 ease-in-out focus:ring focus:ring-white focus:shadow-white hover:ring hover:ring-white hover:shadow-white custom-shadow custom-shadow-hover",
            error ? "border-red-500" : "liquid-glass-border-color",
            { "pr-10": type === "password" },
          )}
        />
        {type === "password" && (
          <VisibilityButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            inputRef={inputRef}
          />
        )}
      </div>
      {error && (
        <p className="ml-1 sm:ml-2 mt-1 text-xs sm:text-sm md:text-base text-red-500">
          {error}
        </p>
      )}
    </>
  );
});

export default Input;
