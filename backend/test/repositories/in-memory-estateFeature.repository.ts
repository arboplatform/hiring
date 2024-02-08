import { Injectable } from '@nestjs/common';
import { EstateFeature, Feature } from '@prisma/client';

import { EstateFeature as EstateFeatureEntity } from '@domain/entities/estateFeature';

import {
  EstateFeatureInstance,
  EstateFeatureMapper,
} from '@infra/database/prisma/mappers/estateFeature.mapper';
import {
  EstateFeatureRepository,
  EstateFeatureWithoutReferences,
} from '@infra/database/repositories/estateFeature.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';

type EstateFeatureWithRelations = EstateFeature & {
  feature: Feature;
};

@Injectable()
export class InMemoryEstateFeatureRepository
  implements EstateFeatureRepository
{
  private items: EstateFeatureWithRelations[] = [];

  constructor(
    private featureRepository: FeatureRepository,
    private featureCategoryRepository: FeatureCategoryRepository,
  ) {}

  async getEstateFeatureById(id: string) {
    const estateFeature = this.items.find(
      (estateFeature) => estateFeature.id === id,
    );

    if (!estateFeature) return null;

    const instance = await this.getInstanceWithRelations(estateFeature);

    return EstateFeatureMapper.toEntity(instance);
  }

  async createEstateFeature(
    estateFeature: EstateFeatureWithoutReferences,
  ): Promise<EstateFeatureEntity> {
    const feature = await this.featureRepository.getFeatureById(
      estateFeature.featureId,
    );

    const entity = EstateFeatureEntity.create({
      ...estateFeature,
      feature,
    });

    this.items.push(EstateFeatureMapper.toInstance(entity));

    return entity;
  }

  private getInstanceWithRelations = async (
    instance: EstateFeatureWithRelations,
  ): Promise<EstateFeatureInstance> => {
    const category =
      await this.featureCategoryRepository.getFeatureCategoryById(
        instance.feature.categoryId,
      );

    return {
      ...instance,
      feature: {
        ...instance.feature,
        category,
      },
    };
  };
}
