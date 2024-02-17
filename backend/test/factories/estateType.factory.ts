import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { EstateType } from '@domain/entities/estateType';

import { EstateTypeMapper } from '@infra/database/prisma/mappers/estateType.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateTypeRequest } from '@infra/database/repositories/estateType.repository';

type Overrides = Partial<EstateTypeRequest>;

export function makeFakeEstateType(data = {} as Overrides) {
  const name = faker.helpers.arrayElement([
    'Casa',
    'Apartamento',
    'Terreno',
    'Sobrado',
  ]);

  const props: EstateTypeRequest = {
    name: data.name || name,
  };

  const estateType = EstateType.create(props);

  return estateType;
}

@Injectable()
export class EstateTypeFactory {
  constructor(private prisma: PrismaService) {}

  async makeEstateType(data = {} as Overrides): Promise<EstateType> {
    const estateType = makeFakeEstateType(data);

    await this.prisma.estateType.create({
      data: {
        ...EstateTypeMapper.toInstance(estateType),
        features: {},
      },
    });

    return estateType;
  }
}
