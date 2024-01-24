import { Property } from "../entities/Property";
import { IAddressCreate } from "./AddressInterface";

export interface IPropertyCreate
  extends Pick<Property, "value" | "size" | "title"> {
  address: IAddressCreate;
}
