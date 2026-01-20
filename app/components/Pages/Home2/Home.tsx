import Image from "next/image";
import Information from "./shared/Hero/Information";
import WomanStudying from "./shared/Hero/WomanStudying";
import BusinessModelDescription from "./shared/HowItWorks/BusinessModelDescription";
import InformationTiles from "./shared/HowItWorks/InformationTiles";
import Trending from "./shared/TrendingBooks/Trending";
import BookTiles from "./shared/TrendingBooks/BookTiles";
import TestimonialsSection from "./shared/Testimonials/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex grow flex-col gap-10 items-center justify-center font-normal pb-10">
      <section className="flex md:landscape:min-h-fullscreen w-full">
        <div className="w-full grow flex flex-row gap-5 animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out">
          <Information />
          <WomanStudying />
        </div>
      </section>

      <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10">
        <BusinessModelDescription />
        <InformationTiles />
      </section>

      <section className="w-full flex flex-col gap-10 items-center justify-center px-5 md:px-10">
        <Image
          src="/img/rocket.png"
          alt="Rocket"
          width={2000}
          height={2000}
          className="size-32"
        />

        <Trending />

        <BookTiles />
      </section>

      <TestimonialsSection />
    </div>
  );
}
