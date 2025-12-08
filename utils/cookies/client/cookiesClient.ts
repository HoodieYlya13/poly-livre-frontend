"use server";

import {
  deleteServerCookie,
  deleteServerCookies,
  deleteServerUserCookies,
  getServerCookie,
  getServerCookies,
  setServerCookie,
} from "../server/cookiesServer";

export async function setClientCookie(
  name: string,
  value: string,
  options: Partial<{
    maxAge: number;
    path: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  }> = {}
) {
  return setServerCookie(name, value, options);
}

export async function getClientCookie(
  name: string
): Promise<string | undefined> {
  return getServerCookie(name);
}

export async function getClientCookies(): Promise<string> {
  return getServerCookies();
}

export async function deleteClientCookie(name: string) {
  return deleteServerCookie(name);
}

export async function deleteClientCookies(names: string[]) {
  return deleteServerCookies(names);
}

export async function deleteClientUserCookies() {
  return deleteServerUserCookies();
}

// TODO: remove after verification

// export function setClientCookie(
//   name: string,
//   value: string,
//   options: {
//     path?: string;
//     maxAge?: number;
//     secure?: boolean;
//     sameSite?: "Strict" | "Lax" | "None";
//   } = {}
// ) {
//   let cookieStr = `${name}=${encodeURIComponent(value)}`;

//   cookieStr += `; path=${options.path || "/"}`;
//   cookieStr += `; max-age=${options.maxAge || 60 * 60 * 24}`;
//   if (options.secure) cookieStr += `; secure`;
//   cookieStr += `; SameSite=${options.sameSite || "Lax"}`;

//   document.cookie = cookieStr;
// }

// export function getClientCookie(name: string): string | undefined {
//   if (typeof document === "undefined") return undefined;
//   return document.cookie
//     .split("; ")
//     .find((row) => row.startsWith(`${name}=`))
//     ?.split("=")[1];
// }

// export function deleteClientCookie(name: string) {
//   setClientCookie(name, "", { maxAge: -1 });
// }