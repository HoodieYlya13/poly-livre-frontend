"use client";

import Button from "../elements/Button";
import { useTranslations } from "next-intl";

export default function DetailsAndCartButtons() {
  const t = useTranslations("BOOK_TILE");
  return (
    <div className="flex flex-col @3xs:flex-row w-full gap-1 @2xs:gap-2 items-center justify-center font-semibold text-xs @2xs:text-sm @xs:text-base">
      <Button
        className="w-full @3xs:w-1/2"
        child={t("DETAILS")}
        secondary
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("Details");
        }}
      />

      <Button
        className="w-full @3xs:w-1/2"
        child={t("ADD_TO_CART")}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("Add to cart");
        }}
      />
    </div>
  );
}
