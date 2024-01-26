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
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .omit({
    id: true,
    createdDate: true,
  });

export const checkPasswordValidate = createUserValidate.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const hashUserPasswordValidate = createUserValidate
  .extend({
    password: z
      .string()
      .min(6)
      .transform((pwd) => bcrypt.hashSync(pwd, 10)),
  })
  .omit({
    confirmPassword: true,
  });

export const userWithoutPassword = userValidate.omit({ password: true });
