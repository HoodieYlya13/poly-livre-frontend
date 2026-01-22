"use client";

import Button from "@/app/components/UI/shared/elements/Button";
import Icon from "@/app/components/UI/shared/elements/SVGs/Icon";
import { useTranslations } from "next-intl";

interface AddToCartAndFavoriteProps {
  bookId: string;
  favorite: boolean;
}

export default function AddToCartAndFavorite({
  bookId,
  favorite,
}: AddToCartAndFavoriteProps) {
  const t = useTranslations("BOOK_PAGE.ACTIONS");

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

      <Button
        onClick={() => {
          console.log(
            favorite ? "remove from favorite" : "add to favorite",
            bookId,
          );
        }}
        child={<Icon name={favorite ? "heartFull" : "heartEmpty"} />}
        className="px-6"
        secondary
      />
    </div>
  );
}
