import { Test } from '@nestjs/testing';

import { Agency } from '@domain/entities/agency';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';

import { InMemoryAgencyRepository } from '@test/repositories/in-memory-agency.repository';

import { PageAgenciesUseCase } from './page-agencies-use-case';

describe('Page Agency UseCase', () => {
  let pageAgenciesUseCase: PageAgenciesUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AgencyRepository,
          useClass: InMemoryAgencyRepository,
        },
        PageAgenciesUseCase,
      ],
    }).compile();

    pageAgenciesUseCase = moduleRef.get(PageAgenciesUseCase);
  });

  it('should be able to page Agencies', async () => {
    const response = await pageAgenciesUseCase.handle({
      filter: {},
      limit: 1,
      offset: 0,
    });

    expect(response.totalCount).toBe(1);
    expect(response.nodes).not.toBeNull();
    expect(response.nodes?.[0]).toBeInstanceOf(Agency);
  });

  it('should be able to filter Agencies in pager', async () => {
    const response = await pageAgenciesUseCase.handle({
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
