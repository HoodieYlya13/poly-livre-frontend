import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useErrors = () => {
  const t = useTranslations("ERRORS");

  return useMemo(
    () => ({
      getError: (code: string) => {
        return t.has(code) ? t(code) : t("GENERIC");
      },
    }),
    [t]
  );
};
