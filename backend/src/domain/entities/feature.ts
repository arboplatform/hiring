import { Entity } from '@core/domain/Entity';
import { Maybe } from '@core/logic/Maybe';

import { FeatureRequest } from '@infra/database/repositories/feature.repository';

import { FeatureCategory } from './featureCategory';

export interface FeatureProps {
  name: string;
  active: boolean;

  singular: string;
  plural: string;
  unit?: Maybe<string>;

  category: FeatureCategory;
  categoryId: string;

  updatedAt: Date;
  createdAt: Date;
}

export class Feature extends Entity<FeatureProps> {
  static create(props: FeatureRequest) {
    const now = new Date();

    return new Feature({ ...props, createdAt: now, updatedAt: now });
  }

  get name() {
    return this.props.name;
  }

  get active() {
    return this.props.active;
  }

  get singular() {
    return this.props.singular;
  }

  get plural() {
    return this.props.plural;
  }

  get unit() {
    return this.props.unit;
  }

  get category() {
    return this.props.category;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
