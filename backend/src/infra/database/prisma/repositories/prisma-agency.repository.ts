import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Agency } from '@domain/entities/agency';

import {
  AgencyRepository,
  FilterAgencies,
  PageAgencies,
} from '@infra/database/repositories/agency.repository';

import { AgencyMapper } from '../mappers/agency.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAgencyRepository implements AgencyRepository {
  constructor(private prisma: PrismaService) {}

  countAgencies(filter: FilterAgencies): Promise<number> {
    return this.prisma.agency.count({ where: filter });
  }

  async pageAgencies({
    filter,
    limit,
    offset,
  }: PageAgencies): AsyncMaybe<Agency[]> {
    const agencies = await this.prisma.agency.findMany({
      where: filter,
      take: limit,
      skip: offset,
    });

    return agencies.map(AgencyMapper.toEntity);
  }

  async getAgencyById(id: string) {
    const agency = await this.prisma.agency.findUnique({
      where: { id },
    });

    if (!agency) return null;

    return AgencyMapper.toEntity(agency);
  }
}
