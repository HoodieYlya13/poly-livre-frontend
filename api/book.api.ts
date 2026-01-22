import { fetchApi } from "./base.api";
import { Book } from "@/models/book.models";

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

    addBook: (formData: FormData) =>
        fetchApi<Book>("/books/add", {
            method: "POST",
            body: formData,
        }),
};
