import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { FeatureCategory } from '@prisma/client';

import { FeatureCategory as FeatureCategoryEntity } from '@domain/entities/featureCategory';

import { FeatureCategoryMapper } from '@infra/database/prisma/mappers/featureCategory.mapper';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';

@Injectable()
export class InMemoryFeatureCategoryRepository
  implements FeatureCategoryRepository
{
  private items: FeatureCategory[] = [];

  constructor() {}

  async getFeatureCategoryById(id: string) {
    await this.createFeatureCategory(id);

    const featureCategory = this.items.find(
      (featureCategory) => featureCategory.id === id,
    );

    if (!featureCategory) return null;

    return FeatureCategoryMapper.toEntity(featureCategory);
  }

  private createFeatureCategory = async (id: string) => {
    const inital = FeatureCategoryEntity.create({
      name: faker.lorem.words({ min: 1, max: 3 }),
    });

    const entity = new FeatureCategoryEntity(inital.props, id);
    this.items.push(FeatureCategoryMapper.toInstance(entity));

    return entity;
  };
}
