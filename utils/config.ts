import { LocaleLanguages } from "@/i18n/utils";

export const APP_NAME = "Liprerie";
export const DEFAULT_LOCALE: LocaleLanguages = "en";
export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || "unknown";
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "unknown";