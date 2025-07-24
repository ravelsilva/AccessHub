import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username deve conter ao menos 5 caracteres." }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(3, { message: "Senha deve conter ao menos 3 caracteres." }),
  email: z.email({ message: "E-mail inválido." }),
});

export const LoginSchema = z.object({
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(3, { message: "Senha deve conter ao menos 3 caracteres." }),
  email: z.email({ message: "E-mail inválido." }),
});

export const UpdatedSchema = z.object({
  id: z.string().min(1),
  username: z
    .string()
    .min(5, { message: "Username deve conter ao menos 5 caracteres." }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(3, { message: "Senha deve conter ao menos 3 caracteres." }),
  email: z.email({ message: "E-mail inválido." }),
});
export const DeletedSchema = z.object({
  email: z.email({ message: "E-mail inválido." }),
});
