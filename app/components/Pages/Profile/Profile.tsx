"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Passkey } from "@/models/passkey.models";
import PasskeyManager from "./shared/PasskeysManager";
import Button from "../../UI/shared/elements/Button";
import { useCommon } from "@/hooks/useCommon";

interface ProfileProps {
  username: string;
  userId: string;
  passkeys?: Passkey[];
}

export default function Profile({ username, userId, passkeys }: ProfileProps) {
  const t = useTranslations("PROFILE");
  const { commonT } = useCommon();

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-5 py-10 md:p-10">
      <h1 className="text-3xl font-bold">{t("TITLE")}</h1>

      <section className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className="text-xl font-bold mb-4">{commonT("MY_BOOKS")}</h2>

        <Button
          type="link"
          href={`/user/${userId}`}
          child={commonT("MY_BOOKS")}
          prefetch
        />
      </section>

      <div className="w-full border-t border-foreground max-w-md sm:max-w-lg" />

      <section className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className="text-xl font-bold mb-4">{t("SECURITY")}</h2>

        <PasskeyManager initialPasskeys={passkeys} />

        <Link href="/profile/user-name" className="font-bold">
          {t.rich("CHANGE_USER_NAME", {
            username,
            important: (chunks) => <span className="font-black">{chunks}</span>,
          })}
        </Link>
      </section>
    </div>
  );
}
