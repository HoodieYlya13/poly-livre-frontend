import TestimonialTile from "@/app/components/UI/shared/components/TestimonialTile";
import { getPreferredLocale } from "@/utils/cookies/cookies.server";
import { getTestimonialsAction } from "@/actions/user/private/user.private.actions";
import { LocaleLanguages } from "@/i18n/utils";

export default async function TestimonialTiles() {
  const preferredLocale = (await getPreferredLocale()) as LocaleLanguages;
  const testimonials = await getTestimonialsAction(preferredLocale);

  return (
    <div className="w-full flex flex-col xl:flex-row gap-3 items-center justify-center">
      {testimonials.map((testimonial) => (
        <TestimonialTile
          testimonial={testimonial}
          key={testimonial.testimonialId}
        />
      ))}
    </div>
  );
}