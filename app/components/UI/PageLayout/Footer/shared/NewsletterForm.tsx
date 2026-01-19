"use client";

import { useActionState, useEffect } from "react";
import { subscribeToNewsletterAction } from "@/actions/user/user.actions";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCommon } from "@/hooks/useCommon";
import { useErrors } from "@/hooks/useErrors";
import { ERROR_CODES } from "@/utils/errors.utils";

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
        name="confirm_email"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 -z-50 w-0 h-0"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 w-full max-w-md">
        <input
          name="email"
          type="email"
          placeholder={t("EMAIL_PLACEHOLDER")}
          required
          disabled={isPending || !!state}
          className="w-full px-3 py-2 rounded border border-primary text-sm disabled:bg-gray-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <button
          type="submit"
          disabled={isPending || !!state}
          className="w-full sm:w-auto bg-primary text-white py-2 px-8 rounded text-center outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isPending ? commonT("") : commonT("SUBSCRIBE")}
        </button>
      </div>
    </form>
  );
}
