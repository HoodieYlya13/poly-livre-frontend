import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useId } from "react";

interface RatingProps {
  score: number;
  max?: number;
  className?: string;
  star?: StarProps;
}

export default function Rating({
  score,
  max = 5,
  className,
  star,
}: RatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} {...star} fill={Math.max(0, Math.min(1, score - i))} />
      ))}
    </div>
  );
}

interface StarProps {
  fill?: number;
  color?: "#E4981F" | "currentColor";
  className?: string;
  borderClassName?: string;
}

export function Star({
  fill = 0,
  color = "#E4981F",
  className,
  borderClassName,
}: StarProps) {
  const id = useId();
  const percentage = Math.max(0, Math.min(100, fill * 100));

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={`${percentage}%`} height="100%" />
        </clipPath>
      </defs>

      <path
        d="M5.98 14.9173L9.18 12.4507L12.38 14.9173L11.18 10.8507L14.18 8.71733H10.4467L9.18 4.584L7.91333 8.71733H4.18L7.18 10.8507L5.98 14.9173ZM3.43333 18.512L5.58533 11.4053L0 7.384H6.95467L9.18 0L11.4067 7.384H18.36L12.7747 11.4053L14.9267 18.512L9.18 14.144L3.43333 18.512Z"
        fill="currentColor"
        className={twMerge(clsx("text-foreground", borderClassName))}
      />

      <g clipPath={`url(#${id})`}>
        <path
          d="M3.43333 18.512L5.58533 11.4053L0 7.384H6.95467L9.18 0L11.4067 7.384H18.36L12.7747 11.4053L14.9267 18.512L9.18 14.144L3.43333 18.512Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
