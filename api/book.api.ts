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

  getBooksByUserId: (id: string) =>
    fetchApi<Book[]>(`/books/user/${id}`, {
      method: "GET",
      userAuthenticated: false,
    }),

  addBook: (data: AddBookFormValues) =>
    fetchApi<Book>("/books/add", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteBook: (id: string) =>
    fetchApi<Book>(`/books/${id}`, {
      method: "DELETE",
    }),

  toggleBookFavorite: (id: string) =>
    fetchApi<Book>(`/books/${id}/favorite`, {
      method: "POST",
    }),

  getBooksByStyle: (style: string) =>
    fetchApi<Book[]>(`/books/style/${style}`, {
      method: "GET",
      userAuthenticated: false,
    }),
};
