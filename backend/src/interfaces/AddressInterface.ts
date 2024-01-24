import { Address } from "../entities/Address";

export interface IAddressCreate
  extends Pick<Address, "city" | "number" | "state" | "street" | "zipCode"> {}
