import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Feature, FeatureCategory } from '@prisma/client';

import { Feature as FeatureEntity } from '@domain/entities/feature';

import { FeatureMapper } from '@infra/database/prisma/mappers/feature.mapper';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';

type FeatureWithRelations = Feature & {
  category: FeatureCategory;
};

@Injectable()
export class InMemoryFeatureRepository implements FeatureRepository {
  private items: FeatureWithRelations[] = [];

  constructor(private categoryRepository: FeatureCategoryRepository) {}

  async getFeatureById(id: string) {
    await this.createFeature(id);

    const feature = this.items.find((feature) => feature.id === id);

    if (!feature) return null;

    return FeatureMapper.toEntity(feature);
  }

  private createFeature = async (id: string) => {
    const name = faker.lorem.words(2);

    const category = await this.categoryRepository.getFeatureCategoryById(
      faker.string.uuid(),
    );

    const inital = FeatureEntity.create({
      active: true,
      name,
      singular: name.toLowerCase(),
      plural: `${name.toLowerCase()}s`,
      unit: faker.lorem.word(),
      category,
      categoryId: category.id,
    });

    const entity = new FeatureEntity(inital.props, id);
    this.items.push(FeatureMapper.toInstance(entity));

    return entity;
  };
}
