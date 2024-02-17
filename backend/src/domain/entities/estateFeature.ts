import { Entity } from '@core/domain/Entity';

import { EstateFeatureRequest } from '@infra/database/repositories/estateFeature.repository';

import { Feature } from './feature';

export interface EstateFeatureProps {
  amount: number;
  showAmount: boolean;

  estateId: string;

  feature: Feature;
  featureId: string;

  updatedAt: Date;
  createdAt: Date;
}

export class EstateFeature extends Entity<EstateFeatureProps> {
  static create(props: EstateFeatureRequest) {
    const now = new Date();

    return new EstateFeature({ ...props, createdAt: now, updatedAt: now });
  }

  get amount() {
    return this.props.amount;
  }

  get showAmount() {
    return this.props.showAmount;
  }

  get estateId() {
    return this.props.estateId;
  }

  get feature() {
    return this.props.feature;
  }

  get featureId() {
    return this.props.featureId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
