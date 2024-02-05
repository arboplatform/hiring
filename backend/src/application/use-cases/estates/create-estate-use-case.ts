import { Injectable } from '@nestjs/common';

import { Estate } from '@domain/entities/estate';

import {
  CreateEstate,
  EstateRepository,
} from '@infra/database/repositories/estate.repository';

@Injectable()
export class CreateEstateUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle(data: CreateEstate): Promise<Estate> {
    return this.estateRepository.createEstate(data);
  }
}
