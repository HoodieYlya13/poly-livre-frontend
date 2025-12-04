import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUsernameSchema, UpdateUsernameValues } from "@/schemas/updateUsernameFormSchema";

export function useUpdateUsernameForm() {
  const form = useForm<UpdateUsernameValues>({
    resolver: zodResolver(UpdateUsernameSchema),
  });

  return {
    ...form,
  };
}