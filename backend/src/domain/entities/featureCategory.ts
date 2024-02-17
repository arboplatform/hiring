import { Entity } from '@core/domain/Entity';
import { Maybe } from '@core/logic/Maybe';

import { FeatureCategoryRequest } from '@infra/database/repositories/featureCategory.repository';

import { Feature } from './feature';

export interface FeatureCategoryProps {
  name: string;

  features?: Maybe<Feature[]>;

  updatedAt: Date;
  createdAt: Date;
}

export class FeatureCategory extends Entity<FeatureCategoryProps> {
  static create(props: FeatureCategoryRequest) {
    const now = new Date();

    return new FeatureCategory({ ...props, createdAt: now, updatedAt: now });
  }

  get name() {
    return this.props.name;
  }

  get features() {
    return this.props.features;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
