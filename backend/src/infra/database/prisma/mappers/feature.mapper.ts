import { Feature } from '@prisma/client';

import {
  Feature as FeatureEntity,
  FeatureProps,
} from '@domain/entities/feature';

import {
  FeatureCategoryInstance,
  FeatureCategoryMapper,
} from './featureCategory.mapper';

export type FeatureInstance = Feature & {
  category: FeatureCategoryInstance;
};

export class FeatureMapper {
  static toEntity(instance: FeatureInstance): FeatureEntity {
    const { id } = instance;

    const props: FeatureProps = {
      name: instance.name,
      active: instance.active,

      singular: instance.singular,
      plural: instance.plural,
      unit: instance.unit,

      category: FeatureCategoryMapper.toEntity(instance.category),
      categoryId: instance.categoryId,

      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new FeatureEntity(props, id);
  }

  static toInstance(entity: FeatureEntity): FeatureInstance {
    return {
      id: entity.id,
      name: entity.name,
      active: entity.active,

      singular: entity.singular,
      plural: entity.plural,
      unit: entity.unit,

      category: FeatureCategoryMapper.toInstance(entity.category),
      categoryId: entity.categoryId,

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
