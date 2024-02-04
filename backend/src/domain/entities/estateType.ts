import { Entity } from '@core/domain/Entity';

import { EstateTypeRequest } from '@infra/database/repositories/estateType.repository';

// import { EstateTypeFeature } from './estateTypeFeature';

export interface EstateTypeProps {
  name: string;

  // features?: Maybe<EstateTypeFeature[]>;

  updatedAt: Date;
  createdAt: Date;
}

export class EstateType extends Entity<EstateTypeProps> {
  static create(props: EstateTypeRequest) {
    const now = new Date();

    return new EstateType({ ...props, createdAt: now, updatedAt: now });
  }

  get name() {
    return this.props.name;
  }

  // get features() {
  //   return this.props.features;
  // }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
