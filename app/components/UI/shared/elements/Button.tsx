import Link, { LinkProps } from "next/link";
import { buttonVariants, cn } from "@/utils/styles.utils";

type ButtonBaseProps = {
  child: React.ReactNode;
  error?: boolean;
  secondary?: boolean;
  className?: string;
  disabled?: boolean;
};

type ButtonElementProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: "button" | "submit" | "reset";
  };

type LinkElementProps = ButtonBaseProps &
  LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    type: "link";
  };

type ButtonProps = ButtonElementProps | LinkElementProps;

export default function Button(props: ButtonProps) {
  if (props.type === "link") {
    const { child, error, secondary, className, disabled, ...rest } = props;

    const classes = cn(
      buttonVariants({
        variant: secondary ? "secondary" : "primary",
        error,
      }),
      className,
    );

    return (
      <Link {...rest} className={classes} aria-disabled={disabled}>
        {child}
      </Link>
    );
  }

  const { type, child, error, secondary, className, disabled, ...rest } = props;

  const classes = cn(
    buttonVariants({
      variant: secondary ? "secondary" : "primary",
      error,
    }),
    className,
  );

  return (
    <button {...rest} type={type} disabled={disabled} className={classes}>
      {child}
    </button>
  );
}
