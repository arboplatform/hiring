import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Feature, FeatureCategory } from '@prisma/client';

import { Feature as FeatureEntity } from '@domain/entities/feature';

import { FeatureMapper } from '@infra/database/prisma/mappers/feature.mapper';
import {
  FeatureRepository,
  FilterFeatures,
  PageFeatures,
} from '@infra/database/repositories/feature.repository';
import { FeatureCategoryRepository } from '@infra/database/repositories/featureCategory.repository';

type FeatureWithRelations = Feature & {
  category: FeatureCategory;
};

@Injectable()
export class InMemoryFeatureRepository implements FeatureRepository {
  private items: FeatureWithRelations[] = [];

  constructor(private categoryRepository: FeatureCategoryRepository) {}

  private filterItemsByProps(filter: FilterFeatures): FeatureWithRelations[] {
    return this.items.filter((feature) => {
      return (
        (!filter.name || feature.name.includes(filter.name)) &&
        (!filter.active || feature.active === filter.active) &&
        (!filter.singular || feature.singular.includes(filter.singular)) &&
        (!filter.plural || feature.plural.includes(filter.plural)) &&
        (!filter.unit || feature.unit.includes(filter.unit)) &&
        (!filter.categoryId || feature.categoryId === filter.categoryId)
      );
    });
  }

  async pageFeatures({ filter, limit, offset }: PageFeatures) {
    await this.createFeature();

    const items = this.filterItemsByProps(filter).slice(offset, offset + limit);

    if (!items.length) return null;

    return items.map((feature) => FeatureMapper.toEntity(feature));
  }

  async countFeatures(filter: FilterFeatures) {
    return this.filterItemsByProps(filter).length;
  }

  async getFeatureById(id: string) {
    await this.createFeature(id);

    const feature = this.items.find((feature) => feature.id === id);

    if (!feature) return null;

    return FeatureMapper.toEntity(feature);
  }

  private createFeature = async (id?: string) => {
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
