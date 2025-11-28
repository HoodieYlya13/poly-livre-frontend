import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  console.log(`Verifying Magic Link token: ${token}`);

  if (token === "valid-token") return NextResponse.json({ verified: true });

  return NextResponse.json({ verified: false }, { status: 400 });
}
