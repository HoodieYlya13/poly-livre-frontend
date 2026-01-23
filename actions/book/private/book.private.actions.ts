import { bookApi } from "@/api/book.api";
import { baseServerAction } from "../../base.server.actions";

export async function getTrendingBooksAction() {
  return baseServerAction(
    "getTrendingBooks",
    async () => {
      return await bookApi.getTrendingBooks();
    },
    {},
  );
}

export async function getAllBooksAction() {
  return baseServerAction(
    "getAllBooks",
    async () => {
      return await bookApi.getAllBooks();
    },
    {},
  );
}

export async function getBookByIdAction(id: string) {
  return baseServerAction(
    "getBookById",
    async () => {
      return await bookApi.getBookById(id);
    },
    {},
  );
}

export async function getBooksByUserIdAction(id: string) {
  return baseServerAction(
    "getBooksByUserId",
    async () => {
      return await bookApi.getBooksByUserId(id);
    },
    {},
  );
}

export async function getBooksByStyleAction(style: string) {
  return baseServerAction(
    "getBooksByStyle",
    async () => {
      return await bookApi.getBooksByStyle(style);
    },
    {},
  );
}
