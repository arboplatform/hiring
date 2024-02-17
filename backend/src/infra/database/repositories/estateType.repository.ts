/**
 * For now estateType is used for read only
 * So we don't need to implement the create, update and delete methods.
 */

import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { EstateType, EstateTypeProps } from '@domain/entities/estateType';

// createdAt and updatedAt are generated automatically
export type EstateTypeRequest = Omit<
  EstateTypeProps,
  'createdAt' | 'updatedAt'
>;

// References are given by their IDs
export type EstateTypeWithoutReferences = Omit<EstateTypeRequest, 'features'>;

// export type CreateEstateTypes = EstateTypeWithoutReferences;

export type FilterEstateTypes = Partial<EstateTypeWithoutReferences>;

// export type UpdateEstateTypeRequest = {
//   id: string;
// } & Partial<EstateTypeWithoutReferences>;

export type PageEstateTypes = {
  filter: FilterEstateTypes;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class EstateTypeRepository {
  abstract countEstateTypes(filter: FilterEstateTypes): Promise<number>;
  abstract pageEstateTypes(filter: PageEstateTypes): AsyncMaybe<EstateType[]>;

  // abstract createEstateType(estateType: CreateEstateTypes): Promise<EstateType>;
  // abstract updateEstateType(estateType: UpdateEstateTypeRequest): Promise<EstateType>;

  abstract getEstateTypeById(id: string): AsyncMaybe<EstateType>;

  // abstract deleteEstateType(id: string): Promise<void>;
}
