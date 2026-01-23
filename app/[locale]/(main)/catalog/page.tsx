import Catalog from "@/app/components/Pages/Catalog/Catalog";
import { getAllBooksAction } from "@/actions/book/private/book.private.actions";

export default async function CatalogPage() {
  const books = await getAllBooksAction();

  return <Catalog books={books} />;
}
