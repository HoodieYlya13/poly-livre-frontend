import Image from "next/image";
import { Book } from "@/models/book.models";
import Rating from "../elements/SVGs/Rating";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";
import AddToCartButton from "./AddCartToButton";
import BookStyles from "./BookStyles";
import Button from "../elements/Button";
import { BACKEND_URL } from "@/utils/config/config.server";
import TopLeftIcon from "./TopLeftIcon";

export default function BookTile({
  book,
  myBook,
  bookId,
  authenticated,
}: {
  book: Book;
  myBook?: boolean;
  bookId: string;
  authenticated?: boolean;
}) {
  const t = useTranslations("BOOK_TILE");
  const format = useFormatter();

  return (
    <div className="w-full max-w-xs xl:max-w-md flex aspect-3/5 border border-foreground rounded-lg custom-shadow custom-shadow-hover overflow-hidden @container whitespace-nowrap relative group">
      <Link href={`/book/${book.id}`} className="absolute inset-0 z-0" />

      <div className="w-full h-full flex flex-col gap-2 items-center justify-between p-2 @3xs:p-4 pointer-events-none">
        <div className="relative w-full rounded-lg border liquid-glass-border-color aspect-6/5 overflow-hidden hidden @3xs:block">
          <Image
            src={BACKEND_URL + book.cover}
            alt={book.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {authenticated && (
            <TopLeftIcon
              icon={
                myBook ? "trash" : book.favorite ? "heartFull" : "heartEmpty"
              }
              bookId={bookId}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h3 className="font-bold text-xl truncate w-full text-center">
            {book.title}
          </h3>

          <p className="truncate w-full text-center">
            {t("WRITTEN_BY")} {book.author}
          </p>

          <BookStyles styles={book.styles} />

          {book.rating && (
            <div className="flex gap-2">
              <Rating score={book.rating} />
              <p>{book.rating}/5</p>
            </div>
          )}

          <p>
            <span className="font-black text-4xl">
              {format.number(book.price, {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            {t("MONTH")}
          </p>

          <p className="text-sm truncate w-full text-center relative z-10 pointer-events-auto">
            {t("OWNER")}{" "}
            <Link
              href={`/user/${encodeURI(book.owner.id)}`}
              className="underline hover:text-primary"
            >
              {book.owner.username}
            </Link>
          </p>
        </div>

        <div className="flex flex-col @3xs:flex-row w-full z-10 pointer-events-auto relative gap-1 @2xs:gap-2 items-center justify-center font-semibold text-xs @2xs:text-sm @xs:text-base">
          <Button
            type="link"
            href={`/book/${book.id}`}
            className="w-full @3xs:w-1/2"
            child={t("DETAILS")}
            secondary
          />

          <AddToCartButton className="w-full @3xs:w-1/2" bookId={book.id} />
        </div>
      </div>
    </div>
  );
}
