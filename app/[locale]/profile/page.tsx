import PageLayout from "../../components/UI/PageLayout/PageLayout";
import PasskeyRegistration from "@/app/components/Pages/Profile/PasskeyRegistration";
import { getUserAccessToken } from "@/utils/cookies/server/getUserAccessToken";
import { redirect } from "next/navigation";
import { getServerCookie } from "@/utils/cookies/server/cookiesServer";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const token = await getUserAccessToken();
  if (!token) redirect("/auth");

  const email = await getServerCookie("user_email");
  const t = await getTranslations("PROFILE");

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 p-4">
        <h1 className="text-3xl font-bold">{t("TITLE")}</h1>

        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{t("SECURITY")}</h2>
          {email ? (
            <PasskeyRegistration email={email} />
          ) : (
            <p className="text-red-500">{t("ERRORS.EMAIL_NOT_FOUND")}</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
