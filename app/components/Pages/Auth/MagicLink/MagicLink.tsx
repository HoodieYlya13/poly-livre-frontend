"use client";

import { verifyMagicLink } from "@/utils/auth/magicLink/verifyMagicLink";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MagicLinkProps {
  token: string;
}

export default function MagicLink({ token }: MagicLinkProps) {
  const t = useTranslations("MAGIC_LINK");
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    verifyMagicLink(token).then((result) => {
      if (result && !result.success) {
        toast.error(t(`ERRORS.${result.error}`));
        router.push("/auth");
      } else if (result && result.success) {
        if (result.username) toast.success(t("HELLO", { username: result.username }));
        router.push("/profile");
      }
    });
  }, [token, router, t]);

  return <p className="flex grow items-center justify-center">{t("VERIFYING")}</p>;
}
