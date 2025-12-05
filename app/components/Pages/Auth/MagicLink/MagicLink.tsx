"use client";

import { verifyMagicLink } from "@/utils/auth/magicLink/verifyMagicLink";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MagicLinkProps {
  token: string;
}

export default function MagicLink({ token }: MagicLinkProps) {
  const [status, setStatus] = useState<"loading" | "error">(() =>
    token ? "loading" : "error"
  );
  const t = useTranslations("MAGIC_LINK");
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    verifyMagicLink(token).then((result) => {
      if (result && !result.success) setStatus("error");
      else if (result && result.success) {
        if (result.username) toast.success(t("HELLO", { username: result.username }));
        router.push("/profile");
      }
    });
  }, [token, router, t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      {status === "loading" ? (
        <p>{t("VERIFYING")}</p>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500 mb-2">
            {t("FAILED.TITLE")}
          </h1>
          <p>{t("FAILED.DESCRIPTION")}</p>
          <Link
            href="/auth"
            className="text-blue-500 hover:underline mt-4 block"
          >
            {t("BACK_TO_LOGIN")}
          </Link>
        </div>
      )}
    </div>
  );
}
