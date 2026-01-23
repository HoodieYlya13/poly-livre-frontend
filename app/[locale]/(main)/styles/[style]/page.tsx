import Catalog from "@/app/components/Pages/Catalog/Catalog";
import { getBooksByStyleAction } from "@/actions/book/private/book.private.actions";

export default async function BookPage(props: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await props.params;

  const books = await getBooksByStyleAction(style);

  return <Catalog books={books} />;
}
