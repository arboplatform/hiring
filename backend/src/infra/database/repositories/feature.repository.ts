/**
 * For now feature is used for read only
 * So we don't need to implement the create, update and delete methods.
 */

import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Feature, FeatureProps } from '@domain/entities/feature';

// createdAt and updatedAt are generated automatically
export type FeatureRequest = Omit<FeatureProps, 'createdAt' | 'updatedAt'>;

// References are given by their IDs
export type FeatureWithoutReferences = Omit<FeatureProps, 'estates'>;

// export type CreateFeatures = FeatureWithoutReferences;

export type FilterFeatures = Partial<FeatureWithoutReferences>;

// export type UpdateFeatureRequest = {
//   id: string;
// } & Partial<FeatureWithoutReferences>;

export type PageFeatures = {
  filter: FilterFeatures;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class FeatureRepository {
  // abstract countFeatures(filter: FilterFeatures): Promise<number>;
  // abstract pageFeatures(filter: PageFeatures): AsyncMaybe<Feature[]>;

  // abstract createFeature(feature: CreateFeatures): Promise<Feature>;
  // abstract updateFeature(feature: UpdateFeatureRequest): Promise<Feature>;

  abstract getFeatureById(id: string): AsyncMaybe<Feature>;

  // abstract deleteFeature(id: string): Promise<void>;
}
