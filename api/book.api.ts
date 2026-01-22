import { fetchApi } from "./base.api";
import { Book } from "@/models/book.models";

export const bookApi = {
  // TODO: create the endpoint
  getTrendingBooks: () =>
    fetchApi<Book[]>("/books/trending", {
      method: "GET",
    }),

  // TODO: create the endpoint
  getBookById: (id: string) =>
    fetchApi<Book>(`/books/${id}`, {
      method: "GET",
    }),
};
