import { Injectable } from '@nestjs/common';

import { FeatureRepository } from '@infra/database/repositories/feature.repository';

import { FeatureMapper } from '../mappers/feature.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFeatureRepository implements FeatureRepository {
  constructor(private prisma: PrismaService) {}

  async getFeatureById(id: string) {
    const feature = await this.prisma.feature.findUnique({
      include: { category: true },
      where: { id },
    });

    if (!feature) return null;

    return FeatureMapper.toEntity(feature);
  }
}
