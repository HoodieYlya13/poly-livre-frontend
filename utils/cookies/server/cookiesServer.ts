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

export async function deleteServerCookie(name: string) {
  (await cookies()).delete(name);
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