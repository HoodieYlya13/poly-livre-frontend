import BookTile from "@/app/components/UI/shared/components/BookTile";
import { getTrendingBooksAction } from "@/actions/book/private/book.private.actions";
import clsx from "clsx";

export default async function BookTiles({ className }: { className?: string }) {
  const trendingBooks = await getTrendingBooksAction();

  return (
    <div className="flex w-full @container">
      <div
        className={clsx(
          "w-full grid @xl:grid-cols-2 @7xl:grid-cols-4 gap-4 justify-items-center mx-auto max-w-2xl @7xl:max-w-8xl",
          className,
        )}
      >
        {trendingBooks.map((book) => (
          <BookTile book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
