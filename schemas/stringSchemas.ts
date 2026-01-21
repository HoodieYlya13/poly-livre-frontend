import { z } from "zod";
import { ERROR_CODES } from "@/utils/errors.utils";

export const StringSchema = z.object({
  string: z.string().min(1, { message: ERROR_CODES.STRING.REQUIRED }), 
});

export type StringValues = z.infer<typeof StringSchema>;

export const TokenSchema = z.object({
  token: z.string().min(1, { message: ERROR_CODES.TOKEN.REQUIRED }), 
});

export type TokenValues = z.infer<typeof TokenSchema>;

export const PasskeyNameSchema = z.object({
  passkeyName: z.string().min(1, { message: ERROR_CODES.STRING.REQUIRED }), 
});

export type PasskeyNameValues = z.infer<typeof PasskeyNameSchema>;

export const CredentialIdSchema = z.object({
  credentialId: z.string().min(1, { message: ERROR_CODES.STRING.REQUIRED }), 
});

export type CredentialIdValues = z.infer<typeof CredentialIdSchema>;

export const RenamePasskeySchema = z.object({
  credentialId: z.string().min(1, { message: ERROR_CODES.STRING.REQUIRED }), 
  newName: z.string().min(1, { message: ERROR_CODES.STRING.REQUIRED }), 
});

export type RenamePasskeyValues = z.infer<typeof RenamePasskeySchema>;
