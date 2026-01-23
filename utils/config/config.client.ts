import { LocaleLanguages } from "@/i18n/utils";

export const TESTING_MODE = process.env.NEXT_PUBLIC_TESTING_MODE || "true";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Liprerie";
export const DEFAULT_LOCALE = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ||
  "en") as LocaleLanguages;
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
