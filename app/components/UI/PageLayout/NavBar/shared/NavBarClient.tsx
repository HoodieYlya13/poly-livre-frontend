"use client";

import Link from "next/link";
import Logout from "./Logout";
import LocaleSwitcher from "./LocaleSwitcher";
import { LocaleLanguages } from "@/i18n/utils";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "../../../shared/elements/SVGs/Logo";
import Icon from "../../../shared/elements/SVGs/Icon";

interface NavBarClientProps {
  locale: LocaleLanguages;
  localeMismatch?: LocaleLanguages;
  token?: string;
}

export default function NavBarClient({
  locale,
  localeMismatch,
  token,
}: NavBarClientProps) {
  return (
    <nav className="w-full flex items-center justify-between px-5 md:px-10">
      <Logo />

      <div className="flex items-center gap-2">
        <ThemeSwitcher />

        <LocaleSwitcher storedLocale={locale} localeMismatch={localeMismatch} />

        <Link href={token ? "/profile" : "/auth"} prefetch>
          <Icon name="account" className="size-8" />
        </Link>

        {token && <Logout />}
      </div>
    </nav>
  );
}
