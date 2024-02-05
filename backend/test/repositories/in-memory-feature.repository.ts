import { Injectable } from '@nestjs/common';
import { Feature } from '@prisma/client';

import { FeatureMapper } from '@infra/database/prisma/mappers/feature.mapper';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';

type FeatureWithRelations = Feature & {
  feature: Feature;
};

@Injectable()
export class InMemoryFeatureRepository implements FeatureRepository {
  private items: FeatureWithRelations[] = [];

  constructor() {}

  async getFeatureById(id: string) {
    const feature = this.items.find((feature) => feature.id === id);

    if (!feature) return null;

    return FeatureMapper.toEntity(feature);
  }

  private getInstanceWithRelations = async (
    instance: Feature,
  ): Promise<Feature> => {};
}
