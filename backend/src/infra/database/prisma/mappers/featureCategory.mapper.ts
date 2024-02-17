import { FeatureCategory } from '@prisma/client';

import { Maybe } from '@core/logic/Maybe';

import {
  FeatureCategory as FeatureCategoryEntity,
  FeatureCategoryProps,
} from '@domain/entities/featureCategory';

import { FeatureInstance, FeatureMapper } from './feature.mapper';

export type FeatureCategoryInstance = FeatureCategory & {
  features?: Maybe<FeatureInstance[]>;
};

export class FeatureCategoryMapper {
  static toEntity(instance: FeatureCategoryInstance): FeatureCategoryEntity {
    const { id } = instance;

    const props: FeatureCategoryProps = {
      name: instance.name,
      features: instance.features?.map((feature) =>
        FeatureMapper.toEntity(feature),
      ),
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new FeatureCategoryEntity(props, id);
  }

  static toInstance(entity: FeatureCategoryEntity): FeatureCategoryInstance {
    return {
      id: entity.id,
      name: entity.name,
      features: entity.features?.map((feature) =>
        FeatureMapper.toInstance(feature),
      ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
