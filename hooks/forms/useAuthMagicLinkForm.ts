import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailSchema, MailValues } from "@/schemas/mailFormSchema";

export function useAuthMagicLinkForm() {
  const form = useForm<MailValues>({
    resolver: zodResolver(MailSchema),
  });

  return {
    ...form,
  };
}
