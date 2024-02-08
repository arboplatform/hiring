import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';
import {
  EstateRepository,
  UpdateEstateRequest,
} from '@infra/database/repositories/estate.repository';
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
import { EditEstateUseCase } from './edit-estate-use-case';

describe('Edit Estate UseCase', () => {
  let createEstateUseCase: CreateEstateUseCase;
  let editEstateUseCase: EditEstateUseCase;

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
        EditEstateUseCase,
      ],
    }).compile();

    createEstateUseCase = moduleRef.get(CreateEstateUseCase);
    editEstateUseCase = moduleRef.get(EditEstateUseCase);
  });

  it('should be able to edit a Estate', async () => {
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

    const newAgencyId = faker.string.uuid();
    const newTypeId = faker.string.uuid();
    const newFeatureId = faker.string.uuid();

    const updatedEstate: UpdateEstateRequest = {
      id: estate.id,
      name: 'New Title',
      description: 'New Description',
      address: {
        city: 'New City example',
        number: 1234,
        state: 'New State example',
        street: 'New Street example',
        zip: '34567890',
      },
      prices: [
        { value: 1234, type: PriceType.RENT },
        { value: 1234, type: PriceType.SALE },
      ],
      agency: { connect: { id: newAgencyId } },
      type: { connect: { id: newTypeId } },
      features: [
        {
          amount: 1,
          featureId: newFeatureId,
          showAmount: true,
        },
      ],
    };

    const response = await editEstateUseCase.handle({
      id: estate.id,
      ...updatedEstate,
    });

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Estate);

    expect(response.id).toBe(estate.id);
    expect(response.name).toBe(updatedEstate.name);
    expect(response.description).toBe(updatedEstate.description);
    expect(response.address).toEqual(updatedEstate.address);

    expect(response.agency.id).toBe(newAgencyId);
    expect(response.type.id).toBe(newTypeId);

    expect(response.prices).toEqual(updatedEstate.prices);

    expect(response.features).toHaveLength(1);
    expect(response.features[0].featureId).toBe(newFeatureId);

    expect(response.createdAt).toBe(estate.createdAt);
    expect(response.updatedAt).not.toBe(estate.updatedAt);
  });

  it('should not be able to edit a Estate with an invalid id', async () => {
    const response = editEstateUseCase.handle({
      id: 'invalid-id',
      name: 'New Title',
    });

    await expect(response).rejects.toThrow(
      new Error('Estate not found') as UseCaseError,
    );
  });
});
