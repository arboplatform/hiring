import { PaginatedType } from '../core';
import { Address, Price } from '../enum';

import { Agency } from './agency';
import { EstateFeature } from './estateFeature';
import { EstateType } from './estateType';

export interface Estate {
  id: string;
  slug: string;
  active: boolean;

  name: string;
  description: string;

  address: Address;
  prices: Price[];

  features: EstateFeature[];
  agency: Agency;
  type: EstateType;

  agencyId: string;
  typeId: string;

  updatedAt: string;
  createdAt: string;
}

export type FeatureDTO = {
  featureId: string;
  amount: number;
  showAmount: boolean;
};

export interface EstateDTO {
  name: string;
  description: string;
  active?: boolean;

  address: Address;
  prices: Price[];

  features: FeatureDTO[];
  agencyId: string;
  typeId: string;
}

export type Estates = PaginatedType<Estate>;
