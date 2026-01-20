"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { setClientCookie } from "@/utils/cookies/cookies.client";
import { BottomModal } from "../../../shared/elements/Modal";
import Button from "../../../shared/elements/Button";

interface CookieConsentProps {
  initialHasConsent: boolean;
}

export default function CookieConsent({
  initialHasConsent,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(!initialHasConsent);
  const t = useTranslations("COOKIE_CONSENT");

  if (!isVisible) return null;

  const handleAcknowledge = () => {
    setClientCookie("cookie_consent", "acknowledged", {
      maxAge: 60 * 60 * 24 * 365,
    });
    setIsVisible(false);
  };

  return (
    <BottomModal
      title={t("TITLE")}
      description={t("DESCRIPTION")}
      isVisible={isVisible}
      actions={
        <Button
          onClick={handleAcknowledge}
          className="w-full"
          child={t("ACKNOWLEDGE")}
          secondary
        />
      }
    />
  );
}
