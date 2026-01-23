"use server";

import { AddBookSchema, AddBookValues } from "@/schemas/addBookSchema";
import { baseServerAction } from "../base.server.actions";
import { bookApi } from "@/api/book.api";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { ERROR_CODES } from "@/utils/errors.utils";
import { LocaleLanguagesUpperCase } from "@/i18n/utils";
import { Delivery } from "@/models/book.models";
import { revalidatePath } from "next/cache";

export async function addBookAction(data: AddBookValues) {
  return baseServerAction(
    "addBook",
    async () => {
      const ownerId = await getServerCookie("user_id");
      if (!ownerId) throw new Error(ERROR_CODES.AUTH[4]);

      const validatedData = AddBookSchema.safeParse(data);

      if (!validatedData.success) throw new Error();

      const styles = [validatedData.data.style];
      const information = {
        pages: validatedData.data.pages,
        year: validatedData.data.year,
        language: validatedData.data.language as LocaleLanguagesUpperCase,
        delivery: "FREE" as Delivery,
      };

      const book = {
        title: validatedData.data.title,
        author: validatedData.data.author,
        description: validatedData.data.description,
        price: validatedData.data.price,
        loanDuration: validatedData.data.loanDuration,
        styles,
        information,
        ownerId,
      };

      return await bookApi.addBook(book);
    },
    {
      fallback: ERROR_CODES.BOOK.ADD_FAILED,
    },
  );
}

export async function deleteBookAction(id: string) {
  return baseServerAction(
    "deleteBook",
    async () => {
      await bookApi.deleteBook(id);

      revalidatePath("/user");

      return true;
    },
    {
      fallback: ERROR_CODES.BOOK.DELETE_FAILED,
    },
  );
}

export async function toggleBookFavoriteAction(id: string) {
  return baseServerAction(
    "toggleBookFavorite",
    async () => {
      await bookApi.toggleBookFavorite(id);

      revalidatePath("/user"); // TODO: revalidate the right path

      return true;
    },
    {
      fallback: ERROR_CODES.BOOK.TOGGLE_FAVORITE_FAILED,
    },
  );
}
