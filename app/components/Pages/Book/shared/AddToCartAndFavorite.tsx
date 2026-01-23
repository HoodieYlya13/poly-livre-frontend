"use client";

import { toggleBookFavoriteAction } from "@/actions/book/book.actions";
import Button from "@/app/components/UI/shared/elements/Button";
import Icon from "@/app/components/UI/shared/elements/SVGs/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useErrors } from "@/hooks/useErrors";
import { tryCatch } from "@/utils/errors.utils";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

interface AddToCartAndFavoriteProps {
  bookId: string;
  favorite: boolean;
  authenticated?: boolean;
}

export default function AddToCartAndFavorite({
  bookId,
  favorite,
  authenticated,
}: AddToCartAndFavoriteProps) {
  const t = useTranslations("BOOK_PAGE.ACTIONS");
  const { errorT } = useErrors();
  const { shouldReconnect } = useAuth();
  const [, startTransition] = useTransition();

  const toggleBookFavorite = async (id: string) => {
    startTransition(async () => {
      const [error] = await tryCatch(toggleBookFavoriteAction(id));

      if (error) {
        toast.error(errorT(error.message)); // TODO: maybe put the toast in the verify session function
        shouldReconnect(error);
      }
    });
  };

  return (
    <div className="flex flex-row gap-2 w-full">
      <Button
        onClick={() => {
          console.log("add to cart", bookId);
        }}
        child={
          <div className="flex items-center justify-center gap-2 w-full">
            <Icon name="addToCart" />
            <p>{t("ADD_TO_CART")}</p>
          </div>
        }
        className="w-full"
      />

      {authenticated && (
        <Button
          onClick={() => toggleBookFavorite(bookId)}
          child={<Icon name={favorite ? "heartFull" : "heartEmpty"} />}
          className="px-6"
          secondary
        />
      )}
    </div>
  );
}
