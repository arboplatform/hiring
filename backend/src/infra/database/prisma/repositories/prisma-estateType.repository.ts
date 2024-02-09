import { Injectable } from '@nestjs/common';

import {
  EstateTypeRepository,
  EstateTypeWithoutReferences,
} from '@infra/database/repositories/estateType.repository';

import { EstateTypeMapper } from '../mappers/estateType.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEstateTypeRepository implements EstateTypeRepository {
  constructor(private prisma: PrismaService) {}

  countEstateTypes(
    filter: Partial<EstateTypeWithoutReferences>,
  ): Promise<number> {
    return this.prisma.estateType.count({ where: filter });
  }

  async pageEstateTypes({
    filter,
    limit,
    offset,
  }: {
    filter: Partial<EstateTypeWithoutReferences>;
    limit: number;
    offset: number;
  }) {
    const estateTypes = await this.prisma.estateType.findMany({
      where: filter,
      take: limit,
      skip: offset,
    });

    return estateTypes.map(EstateTypeMapper.toEntity);
  }

  async getEstateTypeById(id: string) {
    const estateType = await this.prisma.estateType.findUnique({
      where: { id },
    });

    if (!estateType) return null;

    return EstateTypeMapper.toEntity(estateType);
  }
}
