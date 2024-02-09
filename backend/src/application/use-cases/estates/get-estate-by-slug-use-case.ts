import { Injectable } from '@nestjs/common';

import { UseCaseError } from '@application/errors/use-case-error';

import { Estate } from '@domain/entities/estate';

import { EstateRepository } from '@infra/database/repositories/estate.repository';

type GetEstateBySlugRequest = {
  slug: string;
};

type GetEstateBySlugResponse = Estate;

@Injectable()
export class GetEstateBySlugUseCase {
  constructor(private estateRepository: EstateRepository) {}

  async handle({
    slug,
  }: GetEstateBySlugRequest): Promise<GetEstateBySlugResponse> {
    const estate = await this.estateRepository.getEstateBySlug(slug);

    if (!estate) {
      throw new Error('Estate not found') as UseCaseError;
    }

    return estate;
  }
}
