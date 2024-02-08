import { AgencyProps } from '@domain/entities/agency';
import { EstateFeatureProps } from '@domain/entities/estateFeature';
import { EstateTypeProps } from '@domain/entities/estateType';
import { FeatureProps } from '@domain/entities/feature';
import { FeatureCategoryProps } from '@domain/entities/featureCategory';

import { Address } from '@infra/http/rest/dto/enum/address';
import { Price } from '@infra/http/rest/dto/enum/price';

type Reference<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type EstateFeatureResponse = Omit<
  EstateFeatureProps,
  'feature' | 'createdAt' | 'updatedAt'
> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  feature: Omit<FeatureProps, 'category' | 'createdAt' | 'updatedAt'> & {
    id: string;
    createdAt: string;
    updatedAt: string;
    category: Reference<FeatureCategoryProps>;
  };
};

export class EstateResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  active?: boolean;

  address: Address;
  prices: Price[];

  agency: Reference<AgencyProps>;
  type: Reference<EstateTypeProps>;

  features: EstateFeatureResponse[];

  createdAt: string;
  updatedAt: string;
}
