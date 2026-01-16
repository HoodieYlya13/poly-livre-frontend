import Information from "./shared/Information";
import WomanStudying from "./shared/WomanStudying";

export default function Home() {
  return (
    <div className="flex grow flex-col items-center justify-center pt-20 font-normal">
      <div className="w-full flex flex-row gap-5 animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out">
        <Information />
        <WomanStudying />
      </div>
    </div>
  );
}
