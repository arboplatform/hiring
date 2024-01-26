import { z } from "zod";

export const addressSchema = z.object({
  id: z.number(),
  street: z.string(),
  zipCode: z.string().length(8),
  number: z.string(),
  city: z.string(),
  state: z.string(),
});

export const createAddressSchema = z.object({
  street: z.string().min(1, "Campo obrigatório"),
  zipCode: z.string().length(8, "CEP inválido"),
  number: z.string(),
  city: z.string(),
  state: z.string().length(2),
});
