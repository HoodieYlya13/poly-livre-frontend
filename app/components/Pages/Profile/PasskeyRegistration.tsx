"use client";

import { useState } from "react";
import Button from "../../UI/shared/elements/Button";
import Input from "../../UI/shared/elements/Input";
import { handlePasskeyRegistration } from "@/utils/auth/passkey/handlePasskeyRegistration";
import { useTranslations } from "next-intl";

interface PasskeyRegistrationProps {
  email: string;
}

export default function PasskeyRegistration({
  email,
}: PasskeyRegistrationProps) {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successText, setSuccessText] = useState<string | null>(null);
  const [passkeyName, setPasskeyName] = useState("");
  const t = useTranslations("PROFILE.PASSKEY");

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg border-gray-700">
      <h3 className="text-lg font-bold">{t("TITLE")}</h3>
      <p className="text-sm text-gray-400">{t("DESCRIPTION")}</p>

      <Input
        id="passkey-name"
        label={t("NAME_LABEL")}
        type="text"
        value={passkeyName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPasskeyName(e.target.value)
        }
      />

      <Button
        onClick={() =>
          handlePasskeyRegistration(
            email,
            passkeyName,
            setLoading,
            setErrorText,
            setSuccessText
          )
        }
        disabled={loading || !passkeyName.trim()}
        child={loading ? t("BUTTON_LOADING") : t("BUTTON")}
      />

      {successText && <p className="text-green-500 text-sm">{successText}</p>}
      {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}
