import { Injectable } from '@nestjs/common';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import {
  EstateRepository,
  UpdateEstateRequest,
} from '@infra/database/repositories/estate.repository';

type EditEstateResponse = Estate;

@Injectable()
export class EditEstateUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle({
    id,
    ...filters
  }: UpdateEstateRequest): Promise<EditEstateResponse> {
    const foundEstate = await this.estateRepository.getEstateById(id);

    if (!foundEstate) {
      throw new Error('Estate not found') as UseCaseError;
    }

    const filterRent = filters.prices?.filter((price) => price.type === 'RENT');
    const filterSale = filters.prices?.filter((price) => price.type === 'SALE');

    if (filterRent?.length > 1 || filterSale?.length > 1) {
      throw new Error(
        'You can only have one price for rent and sale',
      ) as UseCaseError;
    }

    const rent = foundEstate.prices.filter((price) => price.type === 'RENT');
    const sale = foundEstate.prices.filter((price) => price.type === 'SALE');

    const estateRent = filterRent?.length ? filterRent[0] : rent[0];
    const estateSale = filterSale?.length ? filterSale[0] : sale[0];

    filters.prices = [estateRent, estateSale].filter(Boolean);

    return this.estateRepository.updateEstate({ id, ...filters });
  }
}
