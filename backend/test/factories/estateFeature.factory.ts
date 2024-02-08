import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { EstateFeature } from '@domain/entities/estateFeature';

import { EstateFeatureMapper } from '@infra/database/prisma/mappers/estateFeature.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateFeatureRequest } from '@infra/database/repositories/estateFeature.repository';

import { makeFakeFeature } from './feature.factory';

type Overrides = Partial<EstateFeatureRequest>;

export function makeFakeEstateFeature(data = {} as Overrides) {
  const amount = faker.number.int({ min: 1, max: 10 });
  const boolean = faker.datatype.boolean();

  const feature = makeFakeFeature();

  const props: EstateFeatureRequest = {
    amount: data.amount || amount,
    showAmount: data.showAmount || boolean,

    featureId: data.feature?.id || feature.id,
    feature: data.feature || feature,

    estateId: data.estateId || '',
  };

  const estateFeature = EstateFeature.create(props);

  return estateFeature;
}

@Injectable()
export class EstateFeatureFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstateFeature(data = {} as Overrides): Promise<EstateFeature> {
    const estateFeature = makeFakeEstateFeature(data);

    const {
      estateId,
      featureId,
      feature: {
        categoryId,
        // eslint-disable-next-line unused-imports/no-unused-vars
        category: { features, ...category },
        ...feature
      },
      ...rest
    } = EstateFeatureMapper.toInstance(estateFeature);

    await this.prisma.estateFeature.create({
      data: {
        ...rest,
        estate: {
          connect: { id: estateId },
        },
        feature: {
          connectOrCreate: {
            where: { id: featureId },
            create: {
              ...feature,
              category: {
                connectOrCreate: {
                  where: { id: categoryId },
                  create: category,
                },
              },
            },
          },
        },
      },
    });

    return estateFeature;
  }
}
