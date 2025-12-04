import { deleteServerCookies } from "@/utils/cookies/server/cookiesServer";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { NextResponse } from "next/server";

export async function POST() {
  const userAccessToken = await getUserAccessToken();

  if (userAccessToken) // TODO: delete the cookie in the backend too

  await deleteServerCookies(["user_access_token", "user_email", "user_id", "user_name"]);

  return NextResponse.json({ success: true });
}