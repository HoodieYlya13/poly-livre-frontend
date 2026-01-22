import { SVGProps } from "react";
import { ICONS, IconName, IconData } from "./IconRegistry";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className, ...props }: IconProps) {
  const icon: IconData = ICONS[name];

  if (!icon) console.warn(`Icon "${name}" not found in registry.`);

  return (
    <svg
      width={icon.width || "24"}
      height={icon.height || "24"}
      viewBox={icon.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d={icon.path}
        fill={icon.stroke ? "none" : "currentColor"}
        stroke={icon.stroke ? "currentColor" : "none"}
        strokeWidth={icon.strokeWidth}
        strokeLinecap={icon.strokeLinecap}
        strokeLinejoin={icon.strokeLinejoin}
      />
    </svg>
  );
}
