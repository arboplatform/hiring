import { Injectable } from '@nestjs/common';
import casual from 'casual';

import { EstateType } from '@domain/entities/estateType';

import { EstateTypeMapper } from '@infra/database/prisma/mappers/estateType.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { EstateTypeRequest } from '@infra/database/repositories/estateType.repository';

type Overrides = Partial<EstateTypeRequest>;

export function makeFakeEstateType(data = {} as Overrides) {
  const { random_element } = casual;

  const props: EstateTypeRequest = {
    name:
      data.name ||
      random_element(['Casa', 'Apartamento', 'Terreno', 'Sobrado']),
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
