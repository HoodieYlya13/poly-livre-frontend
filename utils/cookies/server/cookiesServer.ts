import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function setServerCookie({
  name,
  value,
  response,
  options = {},
}: {
  name: string;
  value: string;
  response: NextResponse;
  options?: Partial<{
    maxAge: number;
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
  }>;
}) {
  response.cookies.set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...options,
  });
}

export async function getServerCookie(
  name: string
): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}

export function setProxyCookie(
  response: NextResponse,
  name: string,
  value: string,
  options: Partial<{
    maxAge: number;
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
  }> = {}
) {
  response.cookies.set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...options,
  });
}

export function getProxyCookie(
  req: NextRequest,
  name: string
): string | undefined {
  return req.cookies.get(name)?.value;
}

export function deleteCookie(name: string, response: NextResponse) {
  response.cookies.set({
    name,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });
}
