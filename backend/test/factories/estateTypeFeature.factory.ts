import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { EstateTypeFeature } from '@domain/entities/estateTypeFeature';

import { EstateTypeFeatureMapper } from '@infra/database/prisma/mappers/estateTypeFeature.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateTypeFeatureRequest } from '@infra/database/repositories/estateTypeFeature.repository';

type Overrides = Omit<
  EstateTypeFeatureRequest,
  'required' | 'estateTypeId' | 'featureId'
> &
  Partial<{
    required: boolean;
  }>;

export function makeFakeEstateTypeFeature(data = {} as Overrides) {
  const boolean = faker.datatype.boolean();

  const props: EstateTypeFeatureRequest = {
    required: data.required || boolean,

    estateTypeId: data.estateType.id,
    estateType: data.estateType,

    featureId: data.feature.id,
    feature: data.feature,
  };

  const estateTypeFeature = EstateTypeFeature.create(props);

  return estateTypeFeature;
}

@Injectable()
export class EstateTypeFeatureFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstateTypeFeature(
    data = {} as Overrides,
  ): Promise<EstateTypeFeature> {
    const estateTypeFeature = makeFakeEstateTypeFeature(data);
    const instance = EstateTypeFeatureMapper.toInstance(estateTypeFeature);

    const { featureId, estateTypeId, ...rest } = instance;

    await this.prisma.estateTypeFeature.create({
      data: {
        ...rest,
        estateType: {
          connect: { id: estateTypeId },
        },
        feature: {
          connect: { id: featureId },
        },
      },
    });

    return estateTypeFeature;
  }
}
