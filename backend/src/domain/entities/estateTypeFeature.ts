import { Entity } from '@core/domain/Entity';

import { EstateTypeFeatureRequest } from '@infra/database/repositories/estateTypeFeature.repository';

import { EstateType } from './estateType';
import { Feature } from './feature';

export interface EstateTypeFeatureProps {
  required: boolean;

  estateType: EstateType;
  estateTypeId: string;

  feature: Feature;
  featureId: string;

  updatedAt: Date;
  createdAt: Date;
}

export class EstateTypeFeature extends Entity<EstateTypeFeatureProps> {
  static create(props: EstateTypeFeatureRequest) {
    const now = new Date();

    return new EstateTypeFeature({ ...props, createdAt: now, updatedAt: now });
  }

  get required() {
    return this.props.required;
  }

  get estateType() {
    return this.props.estateType;
  }

  get estateTypeId() {
    return this.props.estateTypeId;
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
