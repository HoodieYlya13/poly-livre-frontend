"use client";

import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";

export default function NavBarClient() {
  return (
    <nav className="w-full flex items-center justify-between px-4 bg-black">
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={40}
          height={40}
          className="size-10 md:size-15"
          priority
        />
        <span>PolyLivre</span>
      </Link>

      <Logout />
    </nav>
  );
}