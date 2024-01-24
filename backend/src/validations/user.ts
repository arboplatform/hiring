import { z } from "zod";
import bcrypt from "bcrypt";

export const userValidate = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdDate: z.date(),
});

export const createUserValidate = userValidate
  .extend({
    passowrd: z
      .string()
      .min(6)
      .transform((pwd) => bcrypt.hashSync(pwd, 10)),
  })
  .omit({
    id: true,
    createdDate: true,
  });

export const userWithoutPassword = userValidate.omit({ password: true });
