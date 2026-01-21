import Image from "next/image";
import Icon from "../elements/SVGs/Icon";
import { Book } from "@/models/book.models";
import Rating from "../elements/SVGs/Rating";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";
import DetailsAndCartButtons from "./DetailsAndCartButtons";
import BookStyles from "./BookStyles";

export default function BookTile({ book }: { book: Book }) {
  const t = useTranslations("BOOK_TILE");
  const format = useFormatter();

  return (
    <Link
      href={`/book/${book.id}`}
      className="w-full max-w-xs xl:max-w-md flex aspect-3/5 border border-foreground rounded-lg custom-shadow custom-shadow-hover overflow-hidden @container whitespace-nowrap"
    >
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

          <BookStyles styles={book.styles} />

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

        <DetailsAndCartButtons />
      </div>
    </Link>
  );
}
