import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Agency } from '@prisma/client';

import { Agency as AgencyEntity } from '@domain/entities/agency';

import { AgencyMapper } from '@infra/database/prisma/mappers/agency.mapper';
import {
  AgencyRepository,
  FilterAgencies,
  PageAgencies,
} from '@infra/database/repositories/agency.repository';

@Injectable()
export class InMemoryAgencyRepository implements AgencyRepository {
  private items: Agency[] = [];

  constructor() {}

  private filterItemsByProps(filter: FilterAgencies): Agency[] {
    return this.items.filter((agency) => {
      return (
        (!filter.name || agency.name.includes(filter.name)) &&
        (!filter.description || agency.description.includes(filter.description))
      );
    });
  }

  async pageAgencies({ filter, limit, offset }: PageAgencies) {
    await this.createAgency();

    const items = this.filterItemsByProps(filter).slice(offset, offset + limit);

    if (!items.length) return null;

    return items.map(AgencyMapper.toEntity);
  }

  async countAgencies(filter: FilterAgencies) {
    return this.filterItemsByProps(filter).length;
  }

  async getAgencyById(id: string) {
    await this.createAgency(id);

    const agency = this.items.find((agency) => agency.id === id);

    if (!agency) return null;

    return AgencyMapper.toEntity(agency);
  }

  private createAgency = async (id?: string) => {
    const inital = AgencyEntity.create({
      name: faker.company.name(),
      description: faker.lorem.paragraph(3),
    });

    const entity = new AgencyEntity(inital.props, id);
    this.items.push(AgencyMapper.toInstance(entity));

    return entity;
  };
}
