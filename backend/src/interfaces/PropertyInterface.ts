import { Address } from "../entities/Address";
import { Property } from "../entities/Property";

export interface IPropertyCreate
  extends Pick<Property, "value" | "size" | "title"> {
  address: Pick<Address, "city" | "number" | "state" | "street" | "zipCode">;
}
