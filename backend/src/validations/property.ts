import { z } from "zod";
import { userWithoutPassword } from "./user";
import { addressValidate, createAddressValidate } from "./address";

export const propertyValidate = z.object({
  id: z.number(),
  title: z.string(),
  sold: z.boolean(),
  value: z.number(),
  size: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: userWithoutPassword,
  address: createAddressValidate,
});

export const listPropertyValidate = propertyValidate.extend({
  address: addressValidate.extend({
    id: z.number(),
  }),
});

export const createPropertyValidate = propertyValidate.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  sold: true,
  user: true,
});
