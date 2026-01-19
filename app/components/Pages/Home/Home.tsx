import Information from "./shared/hero/Information";
import InformationTiles from "./shared/how-it-works/InformationTiles";
import WomanStudying from "./shared/hero/WomanStudying";
import Image from "next/image";
import TestimonialsSection from "./shared/testimonials/TestimonialsSection";
import BookTiles from "./shared/trending-books/BookTiles";
import Trending from "./shared/trending-books/Trending";
import BusinessModelDescription from "./shared/how-it-works/BusinessModelDescription";

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
