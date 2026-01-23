import Catalog from "@/app/components/Pages/Catalog/Catalog";
import { getBooksByUserIdAction } from "@/actions/book/private/book.private.actions";

export default async function UserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const books = await getBooksByUserIdAction(id);
  return <Catalog books={books} />;
}
