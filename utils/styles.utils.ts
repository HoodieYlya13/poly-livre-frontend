import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sharedStyles = {
  transition: "transition-all duration-300 ease-in-out",
  focus: "outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  disabled:
    "disabled:opacity-30 disabled:cursor-not-allowed disabled:inset-shadow-sm disabled:inset-shadow-black",
  active:
    "cursor-pointer shadow-sm hover:shadow-primary focus:shadow-primary focus:shadow-md",
  error:
    "border-red-500 focus:shadow-red-500 focus:shadow-md focus:ring-red-500",
};

export const buttonVariants = cva(
  [
    "rounded-lg p-2 font-normal text-center whitespace-nowrap",
    sharedStyles.transition,
    sharedStyles.focus,
    sharedStyles.disabled,
  ],
  {
    variants: {
      variant: {
        primary: `bg-primary text-white ${sharedStyles.active}`,
        secondary: `bg-background text-foreground border border-foreground ${sharedStyles.active}`,
      },
      error: {
        true: "border-2 " + sharedStyles.error,
      },
    },
    defaultVariants: {
      variant: "primary",
      error: false,
    },
  },
);

export const inputVariants = cva(
  [
    "block w-full rounded-lg p-2 font-normal placeholder-gray-400",
    "liquid-glass-backdrop liquid-glass-background border",
    sharedStyles.transition,
    sharedStyles.focus,
    sharedStyles.disabled,
  ],
  {
    variants: {
      variant: {
        primary:
          "border-primary shadow-sm hover:shadow-primary focus:shadow-primary focus:shadow-md cursor-pointer",
        secondary:
          "border-foreground/50 cursor-pointer shadow-sm hover:shadow-primary focus:shadow-primary focus:shadow-md",
      },
      isPassword: {
        true: "pr-10",
      },
      error: {
        true: sharedStyles.error,
      },
    },
    defaultVariants: {
      variant: "primary",
      error: false,
      isPassword: false,
    },
  },
);

export const formVariants = cva("flex flex-col w-full gap-6 @container", {
  variants: {
    variant: {
      default: "",
      modal:
        "p-8 sm:p-10 md:p-12 rounded-4xl sm:rounded-[3rem] md:rounded-[3.5rem] z-10 liquid-glass relative animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2 max-w-md sm:max-w-lg md:max-w-xl custom-shadow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
