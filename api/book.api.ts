import { fetchApi } from "./base.api";
import { AddBookFormValues, Book } from "@/models/book.models";

export const bookApi = {
  getTrendingBooks: () =>
    fetchApi<Book[]>("/books/trending", {
      method: "GET",
      userAuthenticated: false,
    }),

  getAllBooks: () =>
    fetchApi<Book[]>("/books/all", {
      method: "GET",
      userAuthenticated: false,
    }),

  getBookById: (id: string) =>
    fetchApi<Book>(`/books/${id}`, {
      method: "GET",
      userAuthenticated: false,
    }),

  addBook: (data: AddBookFormValues) =>
    fetchApi<Book>("/books/add", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
