import { z } from "zod";
import { createAddressSchema } from "./address";

export const createPropertySchema = z.object({
  title: z.string(),
  value: z.string().transform((value) => parseFloat(value)),
  size: z.string().transform((value) => parseFloat(value)),
  address: createAddressSchema,
});
