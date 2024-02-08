import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';
import { EstateRepository } from '@infra/database/repositories/estate.repository';
import { EstateFeatureRepository } from '@infra/database/repositories/estateFeature.repository';
import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';
import { PriceType } from '@infra/http/rest/dto/enum/price';

import { InMemoryAgencyRepository } from '@test/repositories/in-memory-agency.repository';
import { InMemoryEstateRepository } from '@test/repositories/in-memory-estate.repository';
import { InMemoryEstateFeatureRepository } from '@test/repositories/in-memory-estateFeature.repository';
import { InMemoryEstateTypeRepository } from '@test/repositories/in-memory-estateType.repository';
import { InMemoryFeatureRepository } from '@test/repositories/in-memory-feature.repository';
import { InMemoryFeatureCategoryRepository } from '@test/repositories/in-memory-featureCategory.repository';

import { CreateEstateUseCase } from './create-estate-use-case';
import { PageEstatesUseCase } from './page-estates-use-case';
import { RemoveEstateUseCase } from './remove-estate-use-case';

describe('Remove Estate UseCase', () => {
  let createEstateUseCase: CreateEstateUseCase;
  let pageEstatesUseCase: PageEstatesUseCase;
  let removeEstateUseCase: RemoveEstateUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EstateRepository,
          useClass: InMemoryEstateRepository,
        },
        {
          provide: AgencyRepository,
          useClass: InMemoryAgencyRepository,
        },
        {
          provide: EstateTypeRepository,
          useClass: InMemoryEstateTypeRepository,
        },
        {
          provide: FeatureRepository,
          useClass: InMemoryFeatureRepository,
        },
        {
          provide: EstateFeatureRepository,
          useClass: InMemoryEstateFeatureRepository,
        },
        {
          provide: FeatureCategoryRepository,
          useClass: InMemoryFeatureCategoryRepository,
        },
        CreateEstateUseCase,
        PageEstatesUseCase,
        RemoveEstateUseCase,
      ],
    }).compile();

    createEstateUseCase = moduleRef.get(CreateEstateUseCase);
    pageEstatesUseCase = moduleRef.get(PageEstatesUseCase);
    removeEstateUseCase = moduleRef.get(RemoveEstateUseCase);
  });

  it('should be able to remove Estates', async () => {
    const estate = await createEstateUseCase.handle({
      name: 'Estate Example',
      description: 'Description example',
      address: {
        city: 'City example',
        number: 123,
        state: 'State example',
        street: 'Street example',
        zip: '12345678',
      },
      prices: [
        { value: 123, type: PriceType.RENT },
        { value: 123, type: PriceType.SALE },
      ],
      agency: { connect: { id: faker.string.uuid() } },
      type: { connect: { id: faker.string.uuid() } },
      features: [
        {
          amount: 1,
          featureId: faker.string.uuid(),
          showAmount: true,
        },
      ],
    });

    await removeEstateUseCase.handle({
      id: estate.id,
    });

    const response = await pageEstatesUseCase.handle({
      filter: {
        name: 'Estate Example',
      },
      limit: 1,
      offset: 0,
    });

    expect(response.nodes).not.toEqual<Estate[]>(
      expect.arrayContaining([estate]),
    );
  });

  it('should not be able to edit a Estate with an invalid id', async () => {
    const response = removeEstateUseCase.handle({
      id: 'invalid-id',
    });

    await expect(response).rejects.toThrow(
      new Error('Estate not found') as UseCaseError,
    );
  });
});
