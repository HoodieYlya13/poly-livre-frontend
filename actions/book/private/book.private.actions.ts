// import { bookApi } from "@/api/book.api";
import { baseServerAction } from "../../base.server.actions";
import { MOCKED_BOOKS } from "@/utils/mock.utils";

export async function getTrendingBooksAction() {
  return baseServerAction(
    "getTrendingBooks",
    async () => {
      return MOCKED_BOOKS;
      // return await bookApi.getTrendingBooks();
    },
    {},
  );
}

export async function getBookByIdAction(id: string) {
  return baseServerAction(
    "getBookById",
    async () => {
      return MOCKED_BOOKS.find((book) => book.id === id);
      // return await bookApi.getBookById(id);
    },
    {},
  );
}
