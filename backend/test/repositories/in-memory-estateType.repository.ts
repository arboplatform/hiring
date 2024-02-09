import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { EstateType } from '@prisma/client';

import { EstateType as EstateTypeEntity } from '@domain/entities/estateType';

import { EstateTypeMapper } from '@infra/database/prisma/mappers/estateType.mapper';
import {
  EstateTypeRepository,
  FilterEstateTypes,
  PageEstateTypes,
} from '@infra/database/repositories/estateType.repository';

@Injectable()
export class InMemoryEstateTypeRepository implements EstateTypeRepository {
  private items: EstateType[] = [];

  constructor() {}

  private filterItemsByProps(filter: FilterEstateTypes): EstateType[] {
    return this.items.filter((estateType) => {
      return !filter.name || estateType.name.includes(filter.name);
    });
  }

  async getEstateTypeById(id: string) {
    await this.createEstateType(id);

    const estateType = this.items.find((estateType) => estateType.id === id);

    if (!estateType) return null;

    return EstateTypeMapper.toEntity(estateType);
  }

  async pageEstateTypes({ filter, limit, offset }: PageEstateTypes) {
    await this.createEstateType();

    const items = this.filterItemsByProps(filter).slice(offset, offset + limit);

    if (!items.length) return null;

    return items.map(EstateTypeMapper.toEntity);
  }

  async countEstateTypes(filter: FilterEstateTypes) {
    return this.filterItemsByProps(filter).length;
  }

  private createEstateType = async (id?: string) => {
    const inital = EstateTypeEntity.create({
      name: faker.company.name(),
    });

    const entity = new EstateTypeEntity(inital.props, id);
    this.items.push(EstateTypeMapper.toInstance(entity));

    return entity;
  };
}
