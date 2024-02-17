import { Maybe } from "./maybe";

export interface PaginatedType<T> {
  nodes: Maybe<T[]>;
  totalCount: number;
}
