import { z } from "zod";

export const addressValidate = z.object({
  id: z.number(),
  street: z.string().max(100),
  zipCode: z.string().length(8),
  number: z.string().max(7),
  city: z.string().max(20),
  state: z.string().length(2),
});

export const createAddressValidate = addressValidate.omit({ id: true });
