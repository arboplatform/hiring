import { Injectable } from '@nestjs/common';
import { EstateType } from '@prisma/client';

import { EstateTypeMapper } from '@infra/database/prisma/mappers/estateType.mapper';
import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';

@Injectable()
export class InMemoryEstateTypeRepository implements EstateTypeRepository {
  private items: EstateType[] = [];

  constructor() {}

  async getEstateTypeById(id: string) {
    const estateType = this.items.find((estateType) => estateType.id === id);

    if (!estateType) return null;

    return EstateTypeMapper.toEntity(estateType);
  }
}
