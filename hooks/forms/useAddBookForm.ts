import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBookSchema, AddBookValues } from "@/schemas/addBookSchema";

export function useAddBookForm() {
  const form = useForm<AddBookValues>({
    resolver: zodResolver(AddBookSchema) as Resolver<AddBookValues>,
  });

  return {
    ...form,
  };
}
