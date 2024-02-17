import { EstateType } from '@prisma/client';

import {
  EstateType as EstateTypeEntity,
  EstateTypeProps,
} from '@domain/entities/estateType';

// import {
//   EstateTypeFeatureInstance,
//   EstateTypeFeatureMapper,
// } from './estateTypeFeature.mapper';

export type EstateTypeInstance = EstateType;
// & {
//   features?: Maybe<EstateTypeFeatureInstance[]>;
// };

export class EstateTypeMapper {
  static toEntity(instance: EstateTypeInstance): EstateTypeEntity {
    const { id } = instance;

    const props: EstateTypeProps = {
      name: instance.name,
      // features: instance.features?.map((feature) =>
      //   EstateTypeFeatureMapper.toEntity(feature),
      // ),
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new EstateTypeEntity(props, id);
  }

  static toInstance(entity: EstateTypeEntity): EstateTypeInstance {
    return {
      id: entity.id,
      name: entity.name,
      // features: entity.features?.map((feature) =>
      //   EstateTypeFeatureMapper.toInstance(feature),
      // ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
