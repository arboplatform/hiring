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

    return this.estateRepository.updateEstate({ id, ...filters });
  }
}
