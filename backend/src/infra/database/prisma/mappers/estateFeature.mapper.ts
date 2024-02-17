import { EstateFeature } from '@prisma/client';

import {
  EstateFeature as EstateFeatureEntity,
  EstateFeatureProps,
} from '@domain/entities/estateFeature';

import { FeatureInstance, FeatureMapper } from './feature.mapper';

export type EstateFeatureInstance = EstateFeature & {
  feature: FeatureInstance;
};

export class EstateFeatureMapper {
  static toEntity(instance: EstateFeatureInstance): EstateFeatureEntity {
    const { id } = instance;

    const props: EstateFeatureProps = {
      amount: instance.amount,
      showAmount: instance.showAmount,
      estateId: instance.estateId,

      feature: FeatureMapper.toEntity(instance.feature),
      featureId: instance.featureId,

      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new EstateFeatureEntity(props, id);
  }

  static toInstance(entity: EstateFeatureEntity): EstateFeatureInstance {
    return {
      id: entity.id,
      amount: entity.amount,
      showAmount: entity.showAmount,
      estateId: entity.estateId,

      feature: FeatureMapper.toInstance(entity.feature),
      featureId: entity.featureId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
