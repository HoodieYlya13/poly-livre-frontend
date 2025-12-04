import PageLayout from "../../../components/UI/PageLayout/PageLayout";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { redirect } from "next/navigation";
import UserName from "@/app/components/Pages/Profile/UserName/UserName";

export default async function ProfilePage() {
  const token = await getUserAccessToken();
  if (!token) redirect("/auth");

  return (
    <PageLayout>
      <UserName token={token} />
    </PageLayout>
  );
}
