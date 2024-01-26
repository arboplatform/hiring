import { z } from "zod";
import { addressSchema, createAddressSchema } from "./address";
import { userSchema } from "./user";

export const propertySchema = z.object({
  id: z.number(),
  title: z.string(),
  sold: z.boolean(),
  value: z.number(),
  size: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: userSchema,
  address: addressSchema,
});

export const createPropertySchema = z.object({
  title: z.string(),
  value: z.string().transform((value) => parseFloat(value)),
  size: z.string().transform((value) => parseFloat(value)),
  address: createAddressSchema,
});
