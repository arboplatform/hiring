import { Test } from '@nestjs/testing';

import { Feature } from '@domain/entities/feature';

import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';

import { InMemoryFeatureRepository } from '@test/repositories/in-memory-feature.repository';
import { InMemoryFeatureCategoryRepository } from '@test/repositories/in-memory-featureCategory.repository';

import { PageFeaturesUseCase } from './page-features-use-case';

describe('Page Feature UseCase', () => {
  let pageFeaturesUseCase: PageFeaturesUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FeatureRepository,
          useClass: InMemoryFeatureRepository,
        },
        {
          provide: FeatureCategoryRepository,
          useClass: InMemoryFeatureCategoryRepository,
        },
        PageFeaturesUseCase,
      ],
    }).compile();

    pageFeaturesUseCase = moduleRef.get(PageFeaturesUseCase);
  });

  it('should be able to page Features', async () => {
    const response = await pageFeaturesUseCase.handle({
      filter: {},
      limit: 1,
      offset: 0,
    });

    expect(response.totalCount).toBe(1);
    expect(response.nodes).not.toBeNull();
    expect(response.nodes?.[0]).toBeInstanceOf(Feature);
  });

  it('should be able to filter Features in pager', async () => {
    const response = await pageFeaturesUseCase.handle({
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
