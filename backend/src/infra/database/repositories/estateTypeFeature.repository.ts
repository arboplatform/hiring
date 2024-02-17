/**
 * For now estateTypeFeature is used for read only
 * So we don't need to implement the create, update and delete methods.
 */

import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import {
  EstateTypeFeature,
  EstateTypeFeatureProps,
} from '@domain/entities/estateTypeFeature';

// createdAt and updatedAt are generated automatically
export type EstateTypeFeatureRequest = Omit<
  EstateTypeFeatureProps,
  'createdAt' | 'updatedAt'
>;

// References are given by their IDs
export type EstateTypeFeatureWithoutReferences = Omit<
  EstateTypeFeatureProps,
  'estates'
>;

// export type CreateEstateTypeFeatures = EstateTypeFeatureWithoutReferences;

export type FilterEstateTypeFeatures =
  Partial<EstateTypeFeatureWithoutReferences>;

// export type UpdateEstateTypeFeatureRequest = {
//   id: string;
// } & Partial<EstateTypeFeatureWithoutReferences>;

export type PageEstateTypeFeatures = {
  filter: FilterEstateTypeFeatures;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class EstateTypeFeatureRepository {
  // abstract countEstateTypeFeatures(filter: FilterEstateTypeFeatures): Promise<number>;
  abstract pageEstateTypeFeatures(
    filter: PageEstateTypeFeatures,
  ): AsyncMaybe<EstateTypeFeature[]>;

  // abstract createEstateTypeFeature(estateTypeFeature: CreateEstateTypeFeatures): Promise<EstateTypeFeature>;
  // abstract updateEstateTypeFeature(estateTypeFeature: UpdateEstateTypeFeatureRequest): Promise<EstateTypeFeature>;

  abstract getEstateTypeFeatureById(id: string): AsyncMaybe<EstateTypeFeature>;

  // abstract deleteEstateTypeFeature(id: string): Promise<void>;
}
