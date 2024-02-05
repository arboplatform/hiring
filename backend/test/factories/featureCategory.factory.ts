import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { FeatureCategory } from '@domain/entities/featureCategory';

import { FeatureCategoryMapper } from '@infra/database/prisma/mappers/featureCategory.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { FeatureCategoryRequest } from '@infra/database/repositories/featureCategory.repository';

type Overrides = Partial<FeatureCategoryRequest>;

export function makeFakeFeatureCategory(data = {} as Overrides) {
  const { random_value } = casual;

  const props: FeatureCategoryRequest = {
    name: data.name || random_value(['Geral', 'Condomínio', 'Imóvel']),
    features: data.features || [],
  };

  const featureCategory = FeatureCategory.create(props);

  return featureCategory;
}

@Injectable()
export class FeatureCategoryFactory {
  constructor(private prisma: PrismaService) {}

  async makeFeatureCategory(data = {} as Overrides): Promise<FeatureCategory> {
    const featureCategory = makeFakeFeatureCategory(data);
    const category = FeatureCategoryMapper.toInstance(featureCategory);

    await this.prisma.featureCategory.create({
      data: {
        ...category,
        features: {
          connectOrCreate: category.features.map((feature) => ({
            where: { id: feature.id },
            create: feature,
          })),
        },
      },
    });

    return featureCategory;
  }
}
