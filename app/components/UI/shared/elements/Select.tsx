import React, { forwardRef, useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";
import { cn, inputVariants } from "@/utils/styles.utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: FieldError;
  focusOnMount?: boolean;
  secondary?: boolean;
  options: string[] | SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    error,
    focusOnMount = false,
    secondary = false,
    options,
    ...rest
  },
  ref,
) {
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const setRefs = (node: HTMLSelectElement) => {
    selectRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref)
      (ref as React.RefObject<HTMLSelectElement | null>).current = node;
  };

  useEffect(() => {
    if (focusOnMount && selectRef.current) selectRef.current.focus();
  }, [focusOnMount]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="relative input-focus-glow rounded-2xl sm:rounded-3xl md:rounded-[1.75rem]">
        <select
          {...rest}
          id={id}
          name={id}
          ref={setRefs}
          className={cn(
            inputVariants({
              variant: secondary ? "secondary" : "primary",
              error: !!error,
            }),
          )}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const label = typeof option === "string" ? option : option.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      {error && (
        <p className="ml-1 sm:ml-2 mt-1 text-xs sm:text-sm md:text-base text-red-500">
          Champ requis
        </p>
      )}
    </div>
  );
});

export default Select;
