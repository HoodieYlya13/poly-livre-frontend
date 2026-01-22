"use client";

import Button from "../elements/Button";
import { useTranslations } from "next-intl";

export default function AddToCartButton({
  bookId,
  className,
}: {
  bookId: string;
  className?: string;
}) {
  const t = useTranslations("BOOK_TILE");
  return (
    <Button
      className={className}
      child={t("ADD_TO_CART")}
      onClick={() => {
        console.log("Add to cart", bookId);
      }}
    />
  );
}
