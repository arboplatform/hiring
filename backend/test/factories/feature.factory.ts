import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { Feature } from '@domain/entities/feature';

import { FeatureMapper } from '@infra/database/prisma/mappers/feature.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { FeatureRequest } from '@infra/database/repositories/feature.repository';

import { makeFakeFeatureCategory } from './featureCategory.factory';

type Overrides = Partial<FeatureRequest>;

type Info = {
  name: string;
  singular: string;
  plural: string;
  unit?: string;
};

export function makeFakeFeature(data = {} as Overrides) {
  const { random_element } = casual;

  const info: Info = random_element([
    {
      name: 'Área',
      singular: 'área',
      plural: 'áreas',
      unit: 'm²',
    },
    {
      name: 'Quartos',
      singular: 'quarto',
      plural: 'quartos',
    },
    {
      name: 'Banheiros',
      singular: 'banheiro',
      plural: 'banheiros',
    },
    {
      name: 'Vagas de garagem',
      singular: 'vaga',
      plural: 'vagas',
    },
  ]);

  const category = makeFakeFeatureCategory();

  const props: FeatureRequest = {
    ...info,
    active: data.active || true,

    category,
    categoryId: category.id,
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
    const { categoryId, ...rest } = instance;

    await this.prisma.feature.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return feature;
  }
}
