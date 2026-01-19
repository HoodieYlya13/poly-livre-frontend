import Image from "next/image";
import Icon from "../elements/SVGs/Icon";
import { Book } from "@/models/book.models";
import Rating from "../elements/SVGs/Rating";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";

export default function BookTile({ book }: { book: Book }) {
  const t = useTranslations("BOOK_TILE");
  const format = useFormatter();

  return (
    <div className="w-full max-w-xs xl:max-w-md flex aspect-3/5 border border-foreground rounded-lg custom-shadow custom-shadow-hover overflow-hidden @container whitespace-nowrap">
      <div className="w-full h-full flex flex-col gap-2 items-center justify-between p-2 @3xs:p-4">
        <div className="relative w-full rounded-lg border liquid-glass-border-color aspect-6/5 overflow-hidden hidden @3xs:block">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <Icon
            name={book.favorite ? "heartFull" : "heartEmpty"}
            className="absolute top-2 left-2 size-8 text-primary bg-secondary p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h3 className="font-bold text-xl truncate w-full text-center">
            {book.title}
          </h3>

          <p className="truncate w-full text-center">
            {t("WRITTEN_BY")} {book.author}
          </p>

          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 mx-auto w-fit">
              {book.styles.map((style) => (
                <p
                  key={style}
                  className="border border-foreground rounded-lg px-2 py-1 text-sm"
                >
                  {style}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Rating score={book.rating} />
            <p>{book.rating}/5</p>
          </div>

          <p>
            <span className="font-black text-4xl">
              {format.number(book.price, {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            {t("MONTH")}
          </p>

          <p className="text-sm truncate w-full text-center">
            {t("OWNER")}{" "}
            <Link
              href={`/users/${encodeURI(book.owner)}`}
              className="underline"
            >
              {book.owner}
            </Link>
          </p>
        </div>

        <div className="flex flex-col @3xs:flex-row w-full gap-1 @2xs:gap-2 items-center justify-center font-semibold text-xs @2xs:text-sm @xs:text-base">
          <button className="border border-foreground p-2 rounded-md w-full @3xs:w-1/2">
            {t("DETAILS")}
          </button>

          <button className="bg-primary text-background p-2 rounded-md w-full @3xs:w-1/2">
            {t("ADD_TO_CART")}
          </button>
        </div>
      </div>
    </div>
  );
}
