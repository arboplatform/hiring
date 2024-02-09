import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { Estate } from '@domain/entities/estate';

import { EstateMapper } from '@infra/database/prisma/mappers/estate.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateRequest } from '@infra/database/repositories/estate.repository';
import { PriceType } from '@infra/http/rest/dto/enum/price';

import { makeFakeAgency } from './agency.factory';
import { makeFakeEstateFeature } from './estateFeature.factory';
import { makeFakeEstateType } from './estateType.factory';

type Overrides = Partial<{ id: string } & EstateRequest>;

export function makeFakeEstate(data = {} as Overrides) {
  const name = faker.lorem.words(5);
  const description = faker.lorem.paragraph(3);
  const street = faker.location.street();
  const city = faker.location.city();
  const state = faker.location.state();
  const number = faker.location.buildingNumber();
  const zip = faker.location.zipCode('#####-###');

  const slug = (data.name || name).toLowerCase().replace(/\s/g, '-');

  const type = makeFakeEstateType();
  const agency = makeFakeAgency();

  const prices = [
    {
      value: Number(faker.finance.amount({ min: 1000, max: 5000 })),
      type: PriceType.RENT,
    },
    {
      value: Number(faker.finance.amount({ min: 500000, max: 1000000 })),
      type: PriceType.SALE,
    },
  ];

  const estateFeatures = [...new Array(2)].map(() => makeFakeEstateFeature());

  const props: EstateRequest = {
    slug: data.slug || slug,
    name: data.name || name,
    description: data.description || description,
    active: data.active || true,

    address: {
      street: data.address?.street || street,
      city: data.address?.city || city,
      state: data.address?.state || state,
      number: data.address?.number || Number(number),
      zip: data.address?.zip || zip,
    },

    agencyId: data.agency?.id || agency.id,
    agency: data.agency || agency,

    typeId: data.type?.id || type.id,
    type: data.type || type,

    prices: data.prices || prices,
    features: data.features || estateFeatures,
  };

  const estate = Estate.create(props);

  return estate;
}

@Injectable()
export class EstateFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstate(data = {} as Overrides): Promise<Estate> {
    const estate = makeFakeEstate(data);

    const { typeId, agencyId, features, agency, type, ...rest } =
      EstateMapper.toInstance(estate);

    await this.prisma.estate.create({
      select: {
        features: true,
        id: true,
      },
      data: {
        ...rest,
        type: {
          connectOrCreate: {
            where: { id: typeId },
            create: type,
          },
        },
        agency: {
          connectOrCreate: {
            where: { id: agencyId },
            create: agency,
          },
        },
        features: {
          connectOrCreate: features.map((estateFeature) => {
            const {
              // eslint-disable-next-line unused-imports/no-unused-vars
              estateId,
              featureId,
              feature: {
                categoryId,
                // eslint-disable-next-line unused-imports/no-unused-vars
                category: { features, ...category },
                ...feature
              },
              ...rest
            } = estateFeature;

            return {
              where: { id: estateFeature.id },
              create: {
                ...rest,
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
            };
          }),
        },
      },
    });

    return estate;
  }
}
