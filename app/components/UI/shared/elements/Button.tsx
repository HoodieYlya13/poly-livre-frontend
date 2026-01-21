import clsx from "clsx";

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
  const baseClassName = clsx(
    "rounded-lg p-2 font-normal transition-all duration-300 ease-in-out outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-center whitespace-nowrap",
    disabled
      ? "opacity-30 cursor-not-allowed inset-shadow-sm inset-shadow-black"
      : "cursor-pointer shadow-sm hover:shadow-primary focus:shadow-primary focus:shadow-md",
    secondary
      ? "bg-background text-foreground border border-foreground"
      : "bg-primary text-white",
    {
      "border border-2 border-red-500 focus:shadow-red-500 focus:shadow-md focus:ring-red-500":
        error,
    },
  );

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={clsx(baseClassName, className)}
      onClick={onClick}
    >
      {child}
    </button>
  );
}
