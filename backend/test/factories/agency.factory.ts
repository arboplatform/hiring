import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { Agency } from '@domain/entities/agency';

import { AgencyMapper } from '@infra/database/prisma/mappers/agency.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { AgencyRequest } from '@infra/database/repositories/agency.repository';

type Overrides = Partial<AgencyRequest>;

export function makeFakeAgency(data = {} as Overrides) {
  const { description, company_name } = casual;

  const props: AgencyRequest = {
    name: data.name || company_name,
    description: data.description || description,
  };

  const agency = Agency.create(props);

  return agency;
}

@Injectable()
export class AgencyFactory {
  constructor(private prisma: PrismaService) {}

  async makeAgency(data = {} as Overrides): Promise<Agency> {
    const agency = makeFakeAgency(data);

    await this.prisma.agency.create({
      data: AgencyMapper.toInstance(agency),
    });

    return agency;
  }
}
