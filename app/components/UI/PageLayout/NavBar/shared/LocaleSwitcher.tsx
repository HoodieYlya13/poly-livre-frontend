"use client";

import { LocaleLanguages } from "@/i18n/utils";
import { setClientCookie } from "@/utils/cookies/client/cookiesClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface LocaleSwitcherProps {
  storedLocale: LocaleLanguages;
  localeMismatch?: LocaleLanguages;
}

export default function LocaleSwitcher({ storedLocale, localeMismatch }: LocaleSwitcherProps) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const switchTo = async (locale: LocaleLanguages) => {
    setClientCookie("preferred_locale", locale, {
      path: "/",
      sameSite: "Lax",
    });

    const pathname = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;

    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/") + search + hash;
    router.push(newPath);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const currentLocale = pathname.split("/")[1];

    if (!localeMismatch && storedLocale && storedLocale !== currentLocale) {
      const segments = pathname.split("/");
      segments[1] = storedLocale;
      router.replace(segments.join("/"));
    }
  }, [router, storedLocale, localeMismatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAll &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowAll(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAll]);

  const languages = [
    { code: "fr", alt: "French" },
    { code: "en", alt: "English" },
  ];

  return (
    <div className="space-x-2 flex" ref={wrapperRef}>
      {!showAll
        ? languages
            .filter(({ code }) => code === storedLocale)
            .map(({ code, alt }) => (
              <button key={code} onClick={() => setShowAll(true)}>
                <Image
                  src={`/img/flags/${code.toUpperCase()}.svg`}
                  width={24}
                  height={16}
                  alt={alt}
                  className="cursor-pointer border custom-shadow custom-shadow-hover"
                />
              </button>
            ))
        : languages.map(({ code, alt }) => (
            <button
              key={code}
              onClick={() => {
                switchTo(code as LocaleLanguages);
                setShowAll(false);
              }}
            >
              <Image
                src={`/img/flags/${code.toUpperCase()}.svg`}
                width={24}
                height={16}
                alt={alt}
                className="cursor-pointer border custom-shadow custom-shadow-hover"
              />
            </button>
          ))}
    </div>
  );
}