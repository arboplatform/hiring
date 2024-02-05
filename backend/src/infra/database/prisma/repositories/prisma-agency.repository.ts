import { Injectable } from '@nestjs/common';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';

import { AgencyMapper } from '../mappers/agency.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAgencyRepository implements AgencyRepository {
  constructor(private prisma: PrismaService) {}

  async getAgencyById(id: string) {
    const agency = await this.prisma.agency.findUnique({
      where: { id },
    });

    if (!agency) return null;

    return AgencyMapper.toEntity(agency);
  }
}
