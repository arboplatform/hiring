import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { FeatureCategory } from '@domain/entities/featureCategory';

import { FeatureCategoryMapper } from '@infra/database/prisma/mappers/featureCategory.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { FeatureCategoryRequest } from '@infra/database/repositories/featureCategory.repository';

type Overrides = Partial<Omit<FeatureCategoryRequest, 'features'>>;

export function makeFakeFeatureCategory(data = {} as Overrides) {
  const name = faker.lorem.words({ min: 1, max: 3 });

  const props: FeatureCategoryRequest = {
    name: data.name || name,
  };

  const featureCategory = FeatureCategory.create(props);

  return featureCategory;
}

@Injectable()
export class FeatureCategoryFactory {
  constructor(private prisma: PrismaService) {}

  async makeFeatureCategory(data = {} as Overrides): Promise<FeatureCategory> {
    const featureCategory = makeFakeFeatureCategory(data);
    const instance = FeatureCategoryMapper.toInstance(featureCategory);

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { features, ...rest } = instance;

    await this.prisma.featureCategory.create({
      data: rest,
    });

    return featureCategory;
  }
}
