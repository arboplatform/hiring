import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { Estate } from '@domain/entities/estate';
import { Feature } from '@domain/entities/feature';

import { EstateMapper } from '@infra/database/prisma/mappers/estate.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateRequest } from '@infra/database/repositories/estate.repository';
import { Price } from '@infra/http/rest/dto/enum/price';

import { makeFakeAgency } from './agency.factory';
import { makeFakeEstateFeature } from './estateFeature.factory';
import { makeFakeEstateType } from './estateType.factory';
import { makeFakeFeature } from './feature.factory';
import { makeFakeFeatureCategory } from './featureCategory.factory';

type Overrides = Partial<EstateRequest>;

export function makeFakeEstate(data = {} as Overrides) {
  const { name, description, street, city, state, building_number, zip } =
    casual;

  const slug = (data.name || name).toLowerCase().replace(/\s/g, '-');

  const featureCategory = makeFakeFeatureCategory({ name: 'Geral' });
  const type = makeFakeEstateType();
  const agency = makeFakeAgency();

  const features = new Array<Feature>(casual.integer(1, 2)).fill(
    makeFakeFeature({ category: featureCategory }),
  );

  const estateFeatures = features.map((feature) =>
    makeFakeEstateFeature({ feature, estateId: estate.id }),
  );

  const prices = new Array<Price>(casual.integer(1, 2)).fill({
    value: casual.double(1000, 15000),
    type: casual.random_element(['RENT', 'SALE']),
  });

  const props: EstateRequest = {
    slug,
    name: data.name || name,
    description: data.description || description,
    active: data.active || true,

    address: {
      street: data.address?.street || street,
      city: data.address?.city || city,
      state: data.address?.state || state,
      number: data.address?.number || Number(building_number),
      zip: data.address?.zip || zip([5, 8]),
    },

    agencyId: agency.id,
    agency,

    typeId: type.id,
    type,

    prices,
    features: estateFeatures,
  };

  const estate = Estate.create(props);

  return estate;
}

@Injectable()
export class EstateFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstate(data = {} as Overrides): Promise<Estate> {
    const estate = makeFakeEstate(data);

    const { typeId, agencyId, features, ...rest } =
      EstateMapper.toInstance(estate);

    await this.prisma.estate.create({
      data: {
        ...rest,
        type: {
          connect: { id: typeId },
        },
        agency: {
          connect: { id: agencyId },
        },
        features: {
          connectOrCreate: features.map((feature) => {
            const { featureId, ...rest } = feature;

            return {
              where: { id: feature.id },
              create: {
                ...rest,
                feature: {
                  connect: { id: featureId },
                },
              },
            };
          }),
        },
      },
    });

    return estate;
  }
}
