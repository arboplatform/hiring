import { Entity } from '@core/domain/Entity';

import { AgencyRequest } from '@infra/database/repositories/agency.repository';

export interface AgencyProps {
  name: string;
  description: string;

  updatedAt: Date;
  createdAt: Date;
}

export class Agency extends Entity<AgencyProps> {
  static create(props: AgencyRequest) {
    const now = new Date();

    return new Agency({ ...props, createdAt: now, updatedAt: now });
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
