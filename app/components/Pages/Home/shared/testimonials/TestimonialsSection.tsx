// import TestimonialTile from "@/app/components/UI/shared/components/TestimonialTile";
// import { useTranslations } from "next-intl";
// import { getPreferredLocale } from "@/utils/cookies/cookies.server";
// import { getTestimonialsAction } from "@/actions/user/user.actions";
// import { LocaleLanguages } from "@/i18n/utils";

// export default async function TestimonialsSection() {
//   const t = useTranslations("HOME_PAGE.TESTIMONIALS");
//   const preferredLocale = await getPreferredLocale() as LocaleLanguages;
//   const testimonials = await getTestimonialsAction(preferredLocale);

//   return (
//     <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10">
//       <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

//       <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
//         {testimonials.map((testimonial) => (
//           <TestimonialTile
//             testimonial={testimonial}
//             key={testimonial.testimonialId}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }


import TestimonialTile from "@/app/components/UI/shared/components/TestimonialTile";
import { useTranslations } from "next-intl";
import { getPreferredLocale } from "@/utils/cookies/cookies.server";
import { getTestimonialsAction } from "@/actions/user/user.actions";
import { LocaleLanguages } from "@/i18n/utils";
import { Suspense } from "react";

async function TestimonialsList() {
  const preferredLocale = (await getPreferredLocale()) as LocaleLanguages;
  const testimonials = await getTestimonialsAction(preferredLocale);

  return (
    <>
      {testimonials.map((testimonial) => (
        <TestimonialTile
          testimonial={testimonial}
          key={testimonial.testimonialId}
        />
      ))}
    </>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("HOME_PAGE.TESTIMONIALS");

  return (
    <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10">
      <h2 className="font-bold text-2xl sm:text-3xl">{t("TITLE")}</h2>

      <div className="w-full flex flex-col xl:flex-row gap-3 items-center justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <TestimonialsList />
        </Suspense>
      </div>
    </section>
  );
}
