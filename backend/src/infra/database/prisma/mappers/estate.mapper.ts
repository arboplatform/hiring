import { Estate } from '@prisma/client';

import { PriceType } from '@infra/http/rest/dto/enum/price';

import { Estate as EstateEntity, EstateProps } from '@domain/entities/estate';

import { AgencyInstance, AgencyMapper } from './agency.mapper';
import {
  EstateFeatureInstance,
  EstateFeatureMapper,
} from './estateFeature.mapper';
import { EstateTypeInstance, EstateTypeMapper } from './estateType.mapper';

export type EstateInstance = Estate & {
  agency: AgencyInstance;
  type: EstateTypeInstance;
  features: EstateFeatureInstance[];
};

export class EstateMapper {
  static toEntity(instance: EstateInstance): EstateEntity {
    const { id } = instance;

    const props: EstateProps = {
      name: instance.name,
      slug: instance.slug,
      description: instance.description,
      active: instance.active,

      address: instance.address,
      prices: instance.prices.map((price) => ({
        ...price,
        type: PriceType[price.type],
      })),

      features: instance.features.map((feature) =>
        EstateFeatureMapper.toEntity(feature),
      ),

      agency: AgencyMapper.toEntity(instance.agency),
      agencyId: instance.agencyId,
      type: EstateTypeMapper.toEntity(instance.type),
      typeId: instance.typeId,

      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new EstateEntity(props, id);
  }

  static toInstance(entity: EstateEntity): EstateInstance {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      active: entity.active,

      address: entity.address,
      prices: entity.prices,

      features: entity.features.map((feature) =>
        EstateFeatureMapper.toInstance(feature),
      ),

      agency: AgencyMapper.toInstance(entity.agency),
      agencyId: entity.agencyId,
      type: EstateTypeMapper.toInstance(entity.type),
      typeId: entity.typeId,

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
