import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import {
  EstateFeature,
  EstateFeatureProps,
} from '@domain/entities/estateFeature';

// createdAt and updatedAt are generated automatically
export type EstateFeatureRequest = Omit<
  EstateFeatureProps,
  'createdAt' | 'updatedAt'
>;

// References are given by their IDs
export type EstateFeatureWithoutReferences = Omit<
  EstateFeatureProps,
  'estates'
>;

export type CreateEstateFeatures = EstateFeatureWithoutReferences;

export type FilterEstateFeatures = Partial<EstateFeatureWithoutReferences>;

export type UpdateEstateFeatureRequest = {
  id: string;
} & Partial<EstateFeatureWithoutReferences>;

export type PageEstateFeatures = {
  filter: FilterEstateFeatures;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class EstateFeatureRepository {
  abstract countEstateFeatures(filter: FilterEstateFeatures): Promise<number>;
  abstract pageEstateFeatures(
    filter: PageEstateFeatures,
  ): AsyncMaybe<EstateFeature[]>;

  abstract createEstateFeature(
    estateFeature: CreateEstateFeatures,
  ): Promise<EstateFeature>;
  abstract updateEstateFeature(
    estateFeature: UpdateEstateFeatureRequest,
  ): Promise<EstateFeature>;

  abstract getEstateFeatureById(id: string): AsyncMaybe<EstateFeature>;

  abstract deleteEstateFeature(id: string): Promise<void>;
}
