import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function setServerCookie(
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
  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    ...options,
  });
}

export async function getServerCookie(
  name: string
): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}

export async function getServerCookies(): Promise<string> {
  return (await cookies()).toString();
}

export async function deleteServerCookie(name: string) {
  (await cookies()).delete(name);
}

export async function deleteServerCookies(names: string[]) {
  const cookieStore = await cookies();
  for (const name of names) cookieStore.delete(name);
}

export function setProxyCookie(
  response: NextResponse,
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
  response.cookies.set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    ...options,
  });
}

export function getProxyCookie(
  req: NextRequest,
  name: string
): string | undefined {
  return req.cookies.get(name)?.value;
}

export function deleteProxyCookie(name: string, response: NextResponse) {
  response.cookies.set({
    name,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });
}