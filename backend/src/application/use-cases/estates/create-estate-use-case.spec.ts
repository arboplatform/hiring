import { Test } from '@nestjs/testing';

import { Estate } from '@domain/entities/estate';

import { AgencyRepository } from '@infra/database/repositories/agency.repository';
import { EstateRepository } from '@infra/database/repositories/estate.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { PriceType } from '@infra/http/rest/dto/enum/price';

import { InMemoryAgencyRepository } from '@test/repositories/in-memory-agency.repository';
import { InMemoryEstateRepository } from '@test/repositories/in-memory-estate.repository';

import { CreateEstateUseCase } from './create-estate-use-case';

describe('Create Estate UseCase', () => {
  let createEstateUseCase: CreateEstateUseCase;

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
          provide: FeatureRepository,
          useClass: InMemoryFeatureRepository,
        },
        CreateEstateUseCase,
      ],
    }).compile();

    createEstateUseCase = moduleRef.get(CreateEstateUseCase);
  });

  it('should be able to create a Estate', async () => {
    const response = await createEstateUseCase.handle({
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
        {
          value: 123,
          type: PriceType.rent,
        },
        {
          value: 123,
          type: PriceType.sale,
        },
      ],
      agency: { connect: { id: '' } },
      type: { connect: { id: '' } },
      features: { connect: [{ id: '' }] },
    });

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Estate);
  });
});
