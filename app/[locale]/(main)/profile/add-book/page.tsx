import AddBook from "@/app/components/Pages/Profile/AddBook/AddBook";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { redirect } from "next/navigation";

export default async function AddBookPage() {
  const userId = await getServerCookie("user_id");
  if (!userId) redirect("/auth");

  return <AddBook userId={userId} />;
}
