import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValues } from "@/schemas/userSchema";

export function useCreateProfileForm() {
  const form = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
  });

  return {
    ...form,
  };
}
