import BookTile from "@/app/components/UI/shared/components/BookTile";
import { getTrendingBooksAction } from "@/actions/book/book.actions";

export default async function BookTiles() {
  const trendingBooks = await getTrendingBooksAction();

  return (
    <div className="w-full grid sm:grid-cols-2 xl:grid-cols-4 gap-3 justify-items-center mx-auto max-w-2xl xl:max-w-8xl">
      {trendingBooks.map((book) => (
        <BookTile book={book} key={book.id} />
      ))}
    </div>
  );
}
