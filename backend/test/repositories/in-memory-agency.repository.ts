import { Injectable } from '@nestjs/common';
import { Agency } from '@prisma/client';

import { AgencyMapper } from '@infra/database/prisma/mappers/agency.mapper';
import { AgencyRepository } from '@infra/database/repositories/agency.repository';

@Injectable()
export class InMemoryAgencyRepository implements AgencyRepository {
  private items: Agency[] = [];

  constructor() {}

  async getAgencyById(id: string) {
    const agency = this.items.find((agency) => agency.id === id);

    if (!agency) return null;

    return AgencyMapper.toEntity(agency);
  }
}
