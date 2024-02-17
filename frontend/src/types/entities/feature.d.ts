import { Maybe, PaginatedType } from '../core';

import { FeatureCategory } from './featureCategory';

export interface Feature {
  id: string;
  name: string;
  active: boolean;

  singular: string;
  plural: string;
  unit?: Maybe<string>;

  category: FeatureCategory;
  categoryId: string;

  updatedAt: string;
  createdAt: string;
}

export type Features = PaginatedType<Feature>;
