import { z } from "zod";

export const loginUserFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

export const registerUserFormSchema = z
  .object({
    name: z.string().min(2, "Campo é obrigatorio"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Campo é obrigatorio"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas náo coincidem",
    path: ["confirmPassword"],
  });
