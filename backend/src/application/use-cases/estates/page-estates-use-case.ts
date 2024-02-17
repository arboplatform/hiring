import { Injectable } from '@nestjs/common';

import { Estate } from '@domain/entities/estate';

import { EstateRepository } from '@infra/database/repositories/estate.repository';
import { PageEstates } from '@infra/database/repositories/estate.repository';
import { PaginatedType } from '@infra/http/rest/common/dto/models/paginated';

type PageEstatesResponse = PaginatedType<Estate>;

@Injectable()
export class PageEstatesUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle({
    filter = {},
    limit,
    offset,
  }: PageEstates): Promise<PageEstatesResponse> {
    const estates = await this.estateRepository.pageEstates({
      filter,
      limit,
      offset,
    });

    const totalCount = await this.estateRepository.countEstates(filter);

    return {
      nodes: estates,
      totalCount,
    };
  }
}
