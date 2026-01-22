import TestimonialTile from "@/app/components/UI/shared/components/TestimonialTile";
import { getTestimonialsAction } from "@/actions/user/private/user.private.actions";

export default async function TestimonialTiles() {
  const testimonials = await getTestimonialsAction();

  return (
    <div className="w-full flex flex-col xl:flex-row gap-3 items-center justify-center">
      {testimonials.map((testimonial) => (
        <TestimonialTile testimonial={testimonial} key={testimonial.id} />
      ))}
    </div>
  );
}
