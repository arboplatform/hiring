import { Type } from '@nestjs/common';

import { Maybe } from '@core/logic/Maybe';

export interface PaginatedType<T> {
  nodes: Maybe<T[]>;
  totalCount: number;
}

export function Paginated<T>(): Type<PaginatedType<T>> {
  abstract class PaginatedResult implements PaginatedType<T> {
    nodes: T[];
    totalCount: number;
  }

  return PaginatedResult as Type<PaginatedType<T>>;
}
