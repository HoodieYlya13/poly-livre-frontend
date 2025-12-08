"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyMagicLinkAction } from "@/app/actions/auth/magic-link/verify.magic.link.actions";

interface MagicLinkProps {
  token: string;
}

export default function MagicLink({ token }: MagicLinkProps) {
  const t = useTranslations("MAGIC_LINK");
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verifyMagicLink = async () => {
      try {
        const username = await verifyMagicLinkAction(token);
        if (!username) return router.push("/profile/user-name");
        toast.success(t("HELLO", { username }));
        router.push("/profile");
      } catch (error) {
        toast.error(t("ERRORS." + (error instanceof Error ? error.message : "GENERIC")));
        router.push("/auth");
      }
    };

    verifyMagicLink();
  }, [token, router, t]);

  return <p className="flex grow items-center justify-center">{t("VERIFYING")}</p>;
}
