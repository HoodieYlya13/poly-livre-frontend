export function setClientCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {}
) {
  let cookieStr = `${name}=${encodeURIComponent(value)}`;

  cookieStr += `; path=${options.path || "/"}`;
  cookieStr += `; max-age=${options.maxAge || 60 * 60 * 24}`;
  if (options.secure) cookieStr += `; secure`;
  cookieStr += `; SameSite=${options.sameSite || "Lax"}`;

  document.cookie = cookieStr;
}

export function getClientCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}