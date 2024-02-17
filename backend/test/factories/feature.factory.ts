import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { Feature } from '@domain/entities/feature';

import { FeatureMapper } from '@infra/database/prisma/mappers/feature.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { FeatureRequest } from '@infra/database/repositories/feature.repository';

import { makeFakeFeatureCategory } from './featureCategory.factory';

type Overrides = Partial<FeatureRequest>;

export function makeFakeFeature(data = {} as Overrides) {
  const name = faker.lorem.words({ min: 1, max: 3 });

  const category = makeFakeFeatureCategory();

  const props: FeatureRequest = {
    name: data.name || name,
    active: data.active || true,

    singular: data.singular || name.toLowerCase(),
    plural: data.plural || `${name.toLowerCase()}s`,
    unit: data.unit || faker.lorem.word(),

    category: data.category || category,
    categoryId: data.category?.id || category.id,
  };

  const feature = Feature.create(props);

  return feature;
}

@Injectable()
export class FeatureFactory {
  constructor(private prisma: PrismaService) {}

  async makeFeature(data = {} as Overrides): Promise<Feature> {
    const feature = makeFakeFeature(data);

    const instance = FeatureMapper.toInstance(feature);

    const {
      categoryId,
      // eslint-disable-next-line unused-imports/no-unused-vars
      category: { features, ...category },
      ...rest
    } = instance;

    await this.prisma.feature.create({
      data: {
        ...rest,
        category: {
          connectOrCreate: {
            where: { id: categoryId },
            create: category,
          },
        },
      },
    });

    return feature;
  }
}
