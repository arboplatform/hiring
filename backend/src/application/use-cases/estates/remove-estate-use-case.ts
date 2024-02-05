import { Injectable } from '@nestjs/common';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import { EstateRepository } from '@infra/database/repositories/estate.repository';

type RemoveEstateRequest = {
  id: string;
};

type RemoveEstateResponse = Estate;

@Injectable()
export class RemoveEstateUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle({ id }: RemoveEstateRequest): Promise<RemoveEstateResponse> {
    const foundEstate = await this.estateRepository.getEstateById(id);

    if (!foundEstate) {
      throw new Error('Estate not found') as UseCaseError;
    }

    return this.estateRepository.deleteEstate(id);
  }
}
