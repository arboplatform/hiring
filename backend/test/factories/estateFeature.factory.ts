import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { EstateFeature } from '@domain/entities/estateFeature';

import { EstateFeatureMapper } from '@infra/database/prisma/mappers/estateFeature.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateFeatureRequest } from '@infra/database/repositories/estateFeature.repository';

type Overrides = Omit<
  EstateFeatureRequest,
  'amount' | 'showAmount' | 'featureId'
> & {
  amount?: number;
  showAmount?: boolean;
};

export function makeFakeEstateFeature(data = {} as Overrides) {
  const { integer, boolean } = casual;

  const props: EstateFeatureRequest = {
    amount: data.amount || integer(1, 10),
    showAmount: data.showAmount || boolean,

    featureId: data.feature.id,
    feature: data.feature,

    estateId: data.estateId,
  };

  const estateFeature = EstateFeature.create(props);

  return estateFeature;
}

@Injectable()
export class EstateFeatureFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstateFeature(data = {} as Overrides): Promise<EstateFeature> {
    const estateFeature = makeFakeEstateFeature(data);

    const { estateId, featureId, ...rest } =
      EstateFeatureMapper.toInstance(estateFeature);

    await this.prisma.estateFeature.create({
      data: {
        ...rest,
        estate: {
          connect: { id: estateId },
        },
        feature: {
          connect: { id: featureId },
        },
      },
    });

    return estateFeature;
  }
}
