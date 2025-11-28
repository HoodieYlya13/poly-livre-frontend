// import { deleteCookie } from "@/utils/cookies/server/cookiesServer";
// import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { NextResponse } from "next/server";

export async function POST() {
  // const userAccessToken = await getUserAccessToken();

  // if (userAccessToken) await deleteUserAccessToken(userAccessToken);

  // deleteCookie("user_access_token");

  return NextResponse.json({ success: true });
}
