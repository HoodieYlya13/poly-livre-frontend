import { Book } from "@/models/book.models";
import {
  getServerCookie,
  getUserAccessToken,
} from "@/utils/cookies/cookies.server";
import CatalogContent from "./CatalogContent";

export default async function Catalog({
  books,
  ownerId,
}: {
  books: Book[];
  ownerId?: string;
}) {
  const userId = await getServerCookie("user_id");
  const myBooks = !!(userId && ownerId && userId === ownerId);
  const authenticated = await getUserAccessToken();

  return (
    <CatalogContent
      books={books}
      myBooks={myBooks}
      ownerId={ownerId}
      authenticated={!!authenticated}
    />
  );
}
