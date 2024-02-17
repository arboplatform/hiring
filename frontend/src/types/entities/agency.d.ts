import { PaginatedType } from '../core';

export interface Agency {
  id: string;
  name: string;
  description: string;

  updatedAt: string;
  createdAt: string;
}

export type Agencies = PaginatedType<Agency>;
