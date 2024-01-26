import { Property } from "../entities/Property";
import { IAddressCreate } from "./AddressInterface";

export interface IPropertyCreate
  extends Pick<Property, "value" | "size" | "title"> {
  address: IAddressCreate;
}

export interface IPropertyUpdate
  extends Pick<Property, "value" | "size" | "title" | "sold"> {
  address: IAddressCreate;
}
