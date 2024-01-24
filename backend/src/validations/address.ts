import { z } from "zod";

export const addressValidate = z.object({
  id: z.number(),
  street: z.string().length(100),
  zipCode: z.string().length(8),
  number: z.string().length(7),
  city: z.string().length(20),
  state: z.string().length(2),
});

export const createAddressValidate = addressValidate.omit({ id: true });
