"use client";

import { useActionState, useEffect } from "react";
import { subscribeToNewsletterAction } from "@/actions/user/user.actions";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCommon } from "@/hooks/useCommon";
import { useErrors } from "@/hooks/useErrors";
import { ERROR_CODES } from "@/utils/errors.utils";
import Button from "../../../shared/elements/Button";
import Input from "../../../shared/elements/Input";

export default function NewsletterForm() {
  const t = useTranslations("FOOTER.NEWSLETTER");
  const { errorT } = useErrors();
  const { commonT } = useCommon();
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletterAction,
    null,
  );

  useEffect(() => {
    if (state === true) toast.success(t("NEWSLETTER_SUCCESS"));
    else if (state === false)
      toast.error(errorT(ERROR_CODES.NEWSLETTER.FAILED));
  }, [state, t, errorT]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 w-full items-center"
    >
      <input
        type="text"
        id="confirm_email"
        name="confirm_email"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 -z-50 w-0 h-0"
        aria-hidden="true"
        aria-label="Confirm email"
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 w-full max-w-md">
        <Input
          id="email"
          type="email"
          label={t("EMAIL_PLACEHOLDER")}
          required
          disabled={isPending || !!state}
        />

        <Button
          type="submit"
          disabled={isPending || !!state}
          child={isPending ? commonT("") : commonT("SUBSCRIBE")}
          className="w-full sm:w-auto px-8"
        />
      </div>
    </form>
  );
}
