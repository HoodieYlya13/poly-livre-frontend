import { baseServerAction } from "../../base.server.actions";
import { MOCKED_BOOKS } from "@/utils/mock.utils";

export async function getTrendingBooksAction() {
  return baseServerAction(
    "getTrendingBooks",
    async () => {
      return MOCKED_BOOKS;
    },
    {},
  );
}
