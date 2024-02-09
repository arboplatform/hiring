import { Test } from '@nestjs/testing';

import { EstateType } from '@domain/entities/estateType';

import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';

import { InMemoryEstateTypeRepository } from '@test/repositories/in-memory-estateType.repository';

import { PageEstateTypesUseCase } from './page-estateTypes-use-case';

describe('Page EstateType UseCase', () => {
  let pageEstateTypesUseCase: PageEstateTypesUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EstateTypeRepository,
          useClass: InMemoryEstateTypeRepository,
        },
        PageEstateTypesUseCase,
      ],
    }).compile();

    pageEstateTypesUseCase = moduleRef.get(PageEstateTypesUseCase);
  });

  it('should be able to page EstateTypes', async () => {
    const response = await pageEstateTypesUseCase.handle({
      filter: {},
      limit: 1,
      offset: 0,
    });

    expect(response.totalCount).toBe(1);
    expect(response.nodes).not.toBeNull();
    expect(response.nodes?.[0]).toBeInstanceOf(EstateType);
  });

  it('should be able to filter EstateTypes in pager', async () => {
    const response = await pageEstateTypesUseCase.handle({
      filter: {
        name: 'Retrun no results',
      },
      limit: 2,
      offset: 0,
    });

    expect(response.nodes).toBeNull();
    expect(response.totalCount).toBe(0);
  });
});
