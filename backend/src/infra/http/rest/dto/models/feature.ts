import { Maybe } from '@core/logic/Maybe';

import { FeatureCategoryProps } from '@domain/entities/featureCategory';

type Reference<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export class FeatureResponse {
  id: string;

  name: string;
  active: boolean;

  singular: string;
  plural: string;
  unit?: Maybe<string>;

  category: Reference<FeatureCategoryProps>;
  categoryId: string;

  createdAt: string;
  updatedAt: string;
}
