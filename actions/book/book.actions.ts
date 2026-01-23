"use server";

import { AddBookSchema, AddBookValues } from "@/schemas/addBookSchema";
import { baseServerAction } from "../base.server.actions";
import { bookApi } from "@/api/book.api";
import { getServerCookie } from "@/utils/cookies/cookies.server";
import { ERROR_CODES } from "@/utils/errors.utils";
import { LocaleLanguagesUpperCase } from "@/i18n/utils";
import { Delivery } from "@/models/book.models";

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
    {},
  );
}
