/**
 * For now featureCategory is used for read only
 * So we don't need to implement the create, update and delete methods.
 */

import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import {
  FeatureCategory,
  FeatureCategoryProps,
} from '@domain/entities/featureCategory';

// createdAt and updatedAt are generated automatically
export type FeatureCategoryRequest = Omit<
  FeatureCategoryProps,
  'createdAt' | 'updatedAt'
>;

// References are given by their IDs
export type FeatureCategoryWithoutReferences = Omit<
  FeatureCategoryProps,
  'estates'
>;

// export type CreateFeatureCategories = FeatureCategoryWithoutReferences;

// export type FilterFeatureCategories = Partial<FeatureCategoryWithoutReferences>;

// export type UpdateFeatureCategoryRequest = {
//   id: string;
// } & Partial<FeatureCategoryWithoutReferences>;

// export type PageFeatureCategories = {
//   filter: FilterFeatureCategories;
//   offset: number;
//   limit: number;
// };

@Injectable()
export abstract class FeatureCategoryRepository {
  // abstract countFeatureCategories(filter: FilterFeatureCategories): Promise<number>;
  // abstract pageFeatureCategories(filter: PageFeatureCategories): AsyncMaybe<FeatureCategory[]>;

  // abstract createFeatureCategory(featureCategory: CreateFeatureCategories): Promise<FeatureCategory>;
  // abstract updateFeatureCategory(featureCategory: UpdateFeatureCategoryRequest): Promise<FeatureCategory>;

  abstract getFeatureCategoryById(id: string): AsyncMaybe<FeatureCategory>;

  // abstract deleteFeatureCategory(id: string): Promise<void>;
}
