import { Book } from "@/models/book.models";
import BookTiles from "../Home/shared/TrendingBooks/BookTiles";

export default function Catalog({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-col gap-5 py-10 px-5">
      <h1 className="text-2xl">Catalog</h1>

      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="flex flex-col gap-5">
          <div>Filtres</div>

          <div>Categorie</div>

          <div>Prix</div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="flex ml-auto">Tri</div>

          <div className="flex w-full">
            <BookTiles books={books} className=" @4xl:grid-cols-3 @4xl:max-w-5xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
