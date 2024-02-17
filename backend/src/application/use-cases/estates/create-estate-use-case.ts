import { Injectable } from '@nestjs/common';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import {
  CreateEstate,
  EstateRepository,
} from '@infra/database/repositories/estate.repository';
import { FeatureDto } from '@infra/http/rest/dto/enum/featureDto';

type CreateEstateRequest = CreateEstate & {
  features?: FeatureDto[];
};

@Injectable()
export class CreateEstateUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle(data: CreateEstateRequest): Promise<Estate> {
    const rent = data.prices.filter((price) => price.type === 'RENT');
    const sale = data.prices.filter((price) => price.type === 'SALE');

    if (rent.length > 1 || sale.length > 1) {
      throw new Error(
        'Você só pode ter um preço para aluguel e venda',
      ) as UseCaseError;
    }

    const { features, ...estateData } = data;

    const estate = await this.estateRepository.createEstate(estateData);

    return this.estateRepository.updateEstate({
      id: estate.id,
      features,
    });
  }
}
