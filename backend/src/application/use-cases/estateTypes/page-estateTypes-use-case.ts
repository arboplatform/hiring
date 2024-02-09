import { Injectable } from '@nestjs/common';

import { EstateType } from '@domain/entities/estateType';

import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';
import { PageEstateTypes } from '@infra/database/repositories/estateType.repository';
import { PaginatedType } from '@infra/http/rest/common/dto/models/paginated';

type PageEstateTypesResponse = PaginatedType<EstateType>;

@Injectable()
export class PageEstateTypesUseCase {
  constructor(private estateTypeRepository: EstateTypeRepository) {}

  async handle({
    filter = {},
    limit,
    offset,
  }: PageEstateTypes): Promise<PageEstateTypesResponse> {
    const estateTypes = await this.estateTypeRepository.pageEstateTypes({
      filter,
      limit,
      offset,
    });

    const totalCount = await this.estateTypeRepository.countEstateTypes(filter);

    return {
      nodes: estateTypes,
      totalCount,
    };
  }
}
