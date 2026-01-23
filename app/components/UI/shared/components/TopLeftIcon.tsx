"use client";

import Icon from "../elements/SVGs/Icon";
import { IconName } from "../elements/SVGs/IconRegistry";
import { useTransition } from "react";
import { tryCatch } from "@/utils/errors.utils";
import {
  deleteBookAction,
  toggleBookFavoriteAction,
} from "@/actions/book/book.actions";
import { toast } from "sonner";
import { useErrors } from "@/hooks/useErrors";
import { useAuth } from "@/hooks/useAuth";
import { useCommon } from "@/hooks/useCommon";

export default function TopLeftIcon({
  icon,
  bookId,
}: {
  icon: IconName;
  bookId: string;
}) {
  const [, startTransition] = useTransition();
  const { commonT } = useCommon();
  const { errorT } = useErrors();
  const { shouldReconnect } = useAuth();

  const handleClick = async (id: string) => {
    startTransition(async () => {
      let error: Error | null;
      if (icon === "trash") [error] = await tryCatch(deleteBookAction(id));
      else [error] = await tryCatch(toggleBookFavoriteAction(id));

      if (error) {
        toast.error(errorT(error.message)); // TODO: maybe put the toast in the verify session function
        shouldReconnect(error);
      } else toast.success(commonT(icon === "trash" ? "DELETE_SUCCESS" : "FAVORITE_SUCCESS"));
    });
  };

  return (
    <button
      onClick={() => handleClick(bookId)}
      className="absolute top-2 left-2 z-10 pointer-events-auto text-primary bg-secondary p-2 rounded-md hover:bg-red-100 transition-colors"
    >
      <Icon name={icon} className="size-6" />
    </button>
  );
}
