import { Entity } from '@core/domain/Entity';

import { EstateRequest } from '@infra/database/repositories/estate.repository';
import { Address } from '@infra/http/rest/dto/enum/address';
import { Price } from '@infra/http/rest/dto/enum/price';

import { Agency } from './agency';
import { EstateFeature } from './estateFeature';
import { EstateType } from './estateType';

export interface EstateProps {
  slug: string;
  name: string;
  description: string;
  active: boolean;
  address: Address;

  prices: Price[];
  features: EstateFeature[];

  agency: Agency;
  agencyId: string;

  type: EstateType;
  typeId: string;

  updatedAt: Date;
  createdAt: Date;
}

export class Estate extends Entity<EstateProps> {
  static create(props: EstateRequest) {
    const now = new Date();

    return new Estate({ ...props, createdAt: now, updatedAt: now });
  }

  get slug() {
    return this.props.slug;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get active() {
    return this.props.active;
  }

  get address() {
    return this.props.address;
  }

  get prices() {
    return this.props.prices;
  }

  get features() {
    return this.props.features;
  }

  get agency() {
    return this.props.agency;
  }

  get agencyId() {
    return this.props.agencyId;
  }

  get type() {
    return this.props.type;
  }

  get typeId() {
    return this.props.typeId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
