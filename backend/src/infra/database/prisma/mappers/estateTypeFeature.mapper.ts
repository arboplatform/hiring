import { EstateTypeFeature } from '@prisma/client';

import {
  EstateTypeFeature as EstateTypeFeatureEntity,
  EstateTypeFeatureProps,
} from '@domain/entities/estateTypeFeature';

import { EstateTypeInstance, EstateTypeMapper } from './estateType.mapper';
import { FeatureInstance, FeatureMapper } from './feature.mapper';

export type EstateTypeFeatureInstance = EstateTypeFeature & {
  estateType: EstateTypeInstance;
  feature: FeatureInstance;
};

export class EstateTypeFeatureMapper {
  static toEntity(
    instance: EstateTypeFeatureInstance,
  ): EstateTypeFeatureEntity {
    const { id } = instance;

    const props: EstateTypeFeatureProps = {
      required: instance.required,

      estateType: EstateTypeMapper.toEntity(instance.estateType),
      estateTypeId: instance.estateTypeId,

      feature: FeatureMapper.toEntity(instance.feature),
      featureId: instance.featureId,

      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new EstateTypeFeatureEntity(props, id);
  }

  static toInstance(
    entity: EstateTypeFeatureEntity,
  ): EstateTypeFeatureInstance {
    return {
      id: entity.id,
      required: entity.required,

      estateType: EstateTypeMapper.toInstance(entity.estateType),
      estateTypeId: entity.estateTypeId,

      feature: FeatureMapper.toInstance(entity.feature),
      featureId: entity.featureId,

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
