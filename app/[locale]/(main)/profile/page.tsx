import { getServerCookie } from "@/utils/cookies/cookies.server";
import { redirect } from "next/navigation";
import Profile from "@/app/components/Pages/Profile/Profile";
import { getUserPasskeysAction } from "@/actions/auth/passkey/private/management.passkey.private.actions";
import { AUTH_ERRORS, tryCatch } from "@/utils/errors.utils";

export default async function ProfilePage() {
  const username = await getServerCookie("user_name");
  const userId = await getServerCookie("user_id");
  if (!username || !userId) redirect("/profile/create"); // TODO: remove this at some point because handled in the proxy

  const [error, passkeys] = await tryCatch(getUserPasskeysAction());

  if (error && AUTH_ERRORS.includes(error.message))
    redirect("/auth/session-clear");

  return <Profile username={username} userId={userId} passkeys={passkeys ?? undefined} />
}
