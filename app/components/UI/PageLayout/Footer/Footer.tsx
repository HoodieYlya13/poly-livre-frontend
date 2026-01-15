import { APP_NAME } from "@/utils/config/config.client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-20 md:h-30 border-t liquid-glass-border-color flex flex-col sm:flex-row p-5 md:px-10 shadow-[0_-25px_50px_-12px_rgb(0_0_0/0.25)] justify-center sm:justify-between items-center bg-primary font-normal">
      <div>© Copyright {new Date().getFullYear()} - <b>{APP_NAME}</b></div>

      <div className="flex gap-5">
        <Link href="/CGU">CGU</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/Aide">Aide</Link>
      </div>
    </footer>
  );
}
