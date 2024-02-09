import { Injectable } from '@nestjs/common';

import {
  FeatureRepository,
  FilterFeatures,
  PageFeatures,
} from '@infra/database/repositories/feature.repository';

import { FeatureMapper } from '../mappers/feature.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFeatureRepository implements FeatureRepository {
  constructor(private prisma: PrismaService) {}

  async pageFeatures({ limit, offset, filter }: PageFeatures) {
    const featuresFound = await this.prisma.feature.findMany({
      include: { category: true },
      where: {
        ...filter,
        name: {
          contains: filter.name,
        },
        singular: {
          contains: filter.singular,
        },
        plural: {
          contains: filter.plural,
        },
        unit: {
          contains: filter.unit,
        },
      },
      take: limit,
      skip: offset,
    });

    if (!featuresFound.length) return null;

    return featuresFound.map(FeatureMapper.toEntity);
  }

  countFeatures(filter: FilterFeatures): Promise<number> {
    return this.prisma.feature.count({
      where: {
        ...filter,
        name: {
          contains: filter.name,
        },
        singular: {
          contains: filter.singular,
        },
        plural: {
          contains: filter.plural,
        },
        unit: {
          contains: filter.unit,
        },
      },
    });
  }

  async getFeatureById(id: string) {
    const feature = await this.prisma.feature.findUnique({
      include: { category: true },
      where: { id },
    });

    if (!feature) return null;

    return FeatureMapper.toEntity(feature);
  }
}
