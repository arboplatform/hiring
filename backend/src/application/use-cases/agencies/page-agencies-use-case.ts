import { Injectable } from '@nestjs/common';

import { Agency } from '@domain/entities/agency';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';
import { PageAgencies } from '@infra/database/repositories/agency.repository';
import { PaginatedType } from '@infra/http/rest/common/dto/models/paginated';

type PageAgenciesResponse = PaginatedType<Agency>;

@Injectable()
export class PageAgenciesUseCase {
  constructor(private agencyRepository: AgencyRepository) {}

  async handle({
    filter = {},
    limit,
    offset,
  }: PageAgencies): Promise<PageAgenciesResponse> {
    const agencies = await this.agencyRepository.pageAgencies({
      filter,
      limit,
      offset,
    });

    const totalCount = await this.agencyRepository.countAgencies(filter);

    return {
      nodes: agencies,
      totalCount,
    };
  }
}
