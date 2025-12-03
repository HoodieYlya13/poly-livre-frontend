import { setServerCookie } from "@/utils/cookies/server/cookiesServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === "IA2R_Owners") {
    const response = NextResponse.json({ ok: true });

    await setServerCookie("isAuthorized", "true", {
      maxAge: 60 * 60 * 24 * 31,
    });

    return response;
  }

  return NextResponse.json({ error: "PASSWORD_INCORRECT" }, { status: 401 });
}