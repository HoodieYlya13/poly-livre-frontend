"use server";

import { baseServerAction } from "../base.server.actions";
import { bookApi } from "@/api/book.api";

export async function addBookAction(formData: FormData) {
  return baseServerAction(
    "addBook",
    async () => {
      return await bookApi.addBook(formData);
    }, 
    {},
  );
}