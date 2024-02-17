/**
 * For now agency is used for read only
 * So we don't need to implement the create, update and delete methods.
 */

import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Agency, AgencyProps } from '@domain/entities/agency';

// createdAt and updatedAt are generated automatically
export type AgencyRequest = Omit<AgencyProps, 'createdAt' | 'updatedAt'>;

// References are given by their IDs
export type AgencyWithoutReferences = AgencyRequest;

// export type CreateAgencies = AgencyWithoutReferences;

export type FilterAgencies = Partial<AgencyWithoutReferences>;

// export type UpdateAgencyRequest = {
//   id: string;
// } & Partial<AgencyWithoutReferences>;

export type PageAgencies = {
  filter: FilterAgencies;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class AgencyRepository {
  abstract countAgencies(filter: FilterAgencies): Promise<number>;
  abstract pageAgencies(filter: PageAgencies): AsyncMaybe<Agency[]>;

  // abstract createAgency(agency: CreateAgencies): Promise<Agency>;
  // abstract updateAgency(agency: UpdateAgencyRequest): Promise<Agency>;

  abstract getAgencyById(id: string): AsyncMaybe<Agency>;

  // abstract deleteAgency(id: string): Promise<void>;
}
