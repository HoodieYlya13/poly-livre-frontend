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
  const {
    className,
    child,
    error,
    disabled = false,
    secondary = false,
  } = props;

  const classes = cn(
    buttonVariants({
      variant: secondary ? "secondary" : "primary",
      error,
    }),
    className,
  );

  if (props.type === "link") {
    const {
      type: _type,
      child: _child,
      error: _error,
      secondary: _secondary,
      className: _className,
      disabled: _disabled,
      ...rest
    } = props;

    return (
      <Link {...rest} className={classes} aria-disabled={disabled}>
        {child}
      </Link>
    );
  }

  const {
    type,
    child: _child,
    error: _error,
    secondary: _secondary,
    className: _className,
    disabled: _disabled,
    ...rest
  } = props;

  return (
    <button {...rest} type={type} disabled={disabled} className={classes}>
      {child}
    </button>
  );
}
