import { Feature } from './feature';

export interface EstateFeature {
  id: string;
  amount: number;
  showAmount: boolean;

  estateId: string;
  featureId: string;

  feature: Feature;

  updatedAt: string;
  createdAt: string;
}
