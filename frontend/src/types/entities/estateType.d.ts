import { PaginatedType } from '../core';

export interface EstateType {
  id: string;
  name: string;

  updatedAt: string;
  createdAt: string;
}

export type EstateTypes = PaginatedType<EstateType>;
