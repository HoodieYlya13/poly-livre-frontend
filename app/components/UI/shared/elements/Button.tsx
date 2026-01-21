import { buttonVariants, cn } from "@/utils/styles.utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  child: React.ReactNode;
  error?: boolean;
  secondary?: boolean;
}

export default function Button({
  type,
  onClick,
  className,
  child,
  error,
  disabled = false,
  secondary = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={cn(
        buttonVariants({
          variant: secondary ? "secondary" : "primary",
          error,
        }),
        className,
      )}
      onClick={onClick}
    >
      {child}
    </button>
  );
}
