import PageLayout from "../../../components/UI/PageLayout/PageLayout";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { redirect } from "next/navigation";
import UserName from "@/app/components/Pages/Profile/UserName/UserName";
import { getServerCookie } from "@/utils/cookies/server/cookiesServer";

export default async function ProfilePage() {
  const token = await getUserAccessToken();
  if (!token) redirect("/auth");

  const username = await getServerCookie("user_name");

  return (
    <PageLayout>
      <UserName username={username} />
    </PageLayout>
  );
}
