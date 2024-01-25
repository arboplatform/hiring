import { z } from "zod";

export const loginUserFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});
