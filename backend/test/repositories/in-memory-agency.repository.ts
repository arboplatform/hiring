import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Agency } from '@prisma/client';

import { Agency as AgencyEntity } from '@domain/entities/agency';

import { AgencyMapper } from '@infra/database/prisma/mappers/agency.mapper';
import { AgencyRepository } from '@infra/database/repositories/agency.repository';

@Injectable()
export class InMemoryAgencyRepository implements AgencyRepository {
  private items: Agency[] = [];

  constructor() {}

  async getAgencyById(id: string) {
    await this.createAgency(id);

    const agency = this.items.find((agency) => agency.id === id);

    if (!agency) return null;

    return AgencyMapper.toEntity(agency);
  }

  private createAgency = async (id: string) => {
    const inital = AgencyEntity.create({
      name: faker.company.name(),
      description: faker.lorem.paragraph(3),
    });

    const entity = new AgencyEntity(inital.props, id);
    this.items.push(AgencyMapper.toInstance(entity));

    return entity;
  };
}
