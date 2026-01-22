import { Testimonial } from "@/models/user.models";
import Rating from "../elements/SVGs/Rating";
import { useTranslations } from "next-intl";

export default function TestimonialTile({ testimonial }: { testimonial: Testimonial }) {
  const t = useTranslations("HOME_PAGE.TESTIMONIALS.STATUS");
  return (
    <div className="w-full max-w-md flex flex-col gap-2 p-5 justify-between aspect-7/4 rounded-lg shadow-lg custom-shadow-hover border liquid-glass-border-color">
      <Rating score={testimonial.rating} />

      <p>“{testimonial.comment}”</p>

      <div className="flex flex-row items-center gap-2">
        <div className="size-12 rounded-full flex items-center justify-center bg-primary text-secondary font-bold">
          {testimonial.firstName[0] + testimonial.lastName[0]}
        </div>

        <div>
          <p className="font-bold">
            {testimonial.firstName} {testimonial.lastName}
          </p>
          <p>{t(testimonial.status)}</p>
        </div>
      </div>
    </div>
  );
}
