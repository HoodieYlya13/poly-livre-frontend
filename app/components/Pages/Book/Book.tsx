import Image from "next/image";
import Link from "next/link";
import { getBookByIdAction } from "@/actions/book/private/book.private.actions";
import Rating from "../../UI/shared/elements/SVGs/Rating";
import Button from "../../UI/shared/elements/Button";
import Icon from "../../UI/shared/elements/SVGs/Icon";
import AddToCartAndFavorite from "./shared/AddToCartAndFavorite";
import { getTranslations } from "next-intl/server";

export default async function Book({ id }: { id: string }) {
  const book = await getBookByIdAction(id);
  const t = await getTranslations("BOOK_PAGE");

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-5 p-5 py-10 max-w-2xl lg:max-w-screen w-full">
        <Link href="/catalog">
          ← <span className="underline">{t("BACK")}</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-5 w-full justify-center items-start">
          <div className="relative w-full lg:w-1/2 aspect-square border border-foreground rounded-2xl max-w-2xl overflow-hidden">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-1/2 max-w-2xl lg:max-w-4xl">
            <div className="flex gap-2">
              <Rating score={book.rating} />
              <p>{book.rating}/5</p>
              <p className="text-foreground/50">
                {t("REVIEWS", { count: book.reviews.length })}
              </p>
            </div>

            <div className="flex flex-row gap-2 w-full justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p>
                  {t("WRITTEN_BY")} {book.author} | {t("OWNER")}{" "}
                  <Link
                    href={`/user/${book.owner.username}`}
                    className="underline"
                  >
                    {book.owner.username}
                  </Link>
                </p>
              </div>

              <div>
                <Button
                  type="link"
                  href={`/styles/${book.styles[0]}`}
                  child={book.styles[0]}
                  className="px-2 py-1 text-sm"
                  secondary
                />
              </div>
            </div>

            <p>
              <span className="font-black text-4xl">{book.price}€</span>
              {t("PER_MONTH")}
            </p>

            <p className="font-bold">{t("ABOUT")}</p>

            {book.description.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary/50 p-5">
              <div className="flex flex-row items-center gap-2">
                <Icon name="bookNextPage" className="text-primary" />

                <div className="flex flex-col">
                  <p>{t("DETAILS.PAGES")}</p>
                  <p className="font-bold">{book.information.pages}</p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Icon name="time" className="text-primary" />

                <div className="flex flex-col">
                  <p>{t("DETAILS.YEAR")}</p>
                  <p className="font-bold">{book.information.year}</p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Icon name="transport" className="text-primary" />

                <div className="flex flex-col">
                  <p>{t("DETAILS.DELIVERY.TITLE")}</p>
                  <p className="font-bold">{t(`DETAILS.DELIVERY.${book.information.delivery}`)}</p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Icon name="language" className="text-primary" />

                <div className="flex flex-col">
                  <p>{t("DETAILS.LANGUAGE.TITLE")}</p>
                  <p className="font-bold">{t(`DETAILS.LANGUAGE.${book.information.language}`)}</p>
                </div>
              </div>
            </div>

            <AddToCartAndFavorite bookId={book.id} favorite={book.favorite} />
          </div>
        </div>
      </div>
    </div>
  );
}
