import { Injectable } from '@nestjs/common';
import {
  Agency,
  Estate,
  EstateFeature,
  EstateType,
  Prisma,
} from '@prisma/client';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Estate as EstateEntity } from '@domain/entities/estate';

import {
  EstateRepository,
  FilterEstates,
  PageEstates,
  CreateEstate,
  UpdateEstateRequest,
} from '@infra/database/repositories/estate.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';

import { PrismaError } from '../errors/prisma-error';
import { EstateInstance, EstateMapper } from '../mappers/estate.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEstateRepository implements EstateRepository {
  constructor(
    private prisma: PrismaService,
    private featureRepository: FeatureRepository,
  ) {}

  async createEstate(estate: CreateEstate): Promise<EstateEntity> {
    // TODO: add possibility to create own slug
    const slug = estate.name.toLowerCase().replace(/ /g, '-');

    const features = estate.features
      ? {
          createMany: {
            data: estate.features,
          },
        }
      : undefined;

    const instance = await this.prisma.estate
      .create({
        include: { agency: true, type: true, features: true },
        data: {
          ...estate,
          slug,
          features,
        },
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaError(e.code).getError();
      });

    const estateInstance = await this.getInstanceWithRelations(instance);

    return EstateMapper.toEntity(estateInstance);
  }

  async updateEstate(estate: UpdateEstateRequest): Promise<EstateEntity> {
    const { id, ...data } = estate;

    const features = estate.features
      ? {
          updateMany: {
            where: { estateId: estate.id },
            data: estate.features,
          },
        }
      : undefined;

    const instance = await this.prisma.estate.update({
      include: { agency: true, type: true, features: true },
      where: { id },
      data: {
        ...data,
        features,
      },
    });

    const estateInstance = await this.getInstanceWithRelations(instance);

    return EstateMapper.toEntity(estateInstance);
  }

  async getEstateById(id: string) {
    const estate = await this.prisma.estate.findUnique({
      include: { agency: true, type: true, features: true },
      where: { id },
    });

    if (!estate) return null;

    const estateInstance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(estateInstance);
  }

  async getEstateBySlug(slug: string): AsyncMaybe<EstateEntity> {
    const estate = await this.prisma.estate.findUnique({
      include: { agency: true, type: true, features: true },
      where: { slug },
    });

    if (!estate) return null;

    const estateInstance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(estateInstance);
  }

  async pageEstates({
    filter,
    limit,
    offset,
  }: PageEstates): AsyncMaybe<EstateEntity[]> {
    const prices = this.getPrices(filter);

    const estateFound = await this.prisma.estate.findMany({
      include: { agency: true, type: true, features: true },
      where: {
        name: {
          contains: filter.name,
        },
        slug: {
          contains: filter.slug,
        },
        description: {
          contains: filter.description,
        },
        active: filter.active,

        agencyId: filter.agencyId,
        typeId: filter.typeId,

        prices,
      },
      take: limit,
      skip: offset,
    });

    if (!estateFound.length) return null;

    const estatesInstance = await Promise.all(
      estateFound.map(this.getInstanceWithRelations),
    );

    return estatesInstance.map(EstateMapper.toEntity);
  }

  countEstates(filter: FilterEstates): Promise<number> {
    const prices = this.getPrices(filter);

    return this.prisma.estate.count({
      where: {
        name: {
          contains: filter.name,
        },
        slug: {
          contains: filter.slug,
        },
        description: {
          contains: filter.description,
        },
        active: filter.active,

        agencyId: filter.agencyId,
        typeId: filter.typeId,

        prices,
      },
    });
  }

  async deleteEstate(id: string): Promise<EstateEntity> {
    await this.prisma.estateFeature.deleteMany({
      where: { estateId: id },
    });

    const estate = await this.prisma.estate.delete({
      include: { agency: true, type: true, features: true },
      where: { id },
    });

    const estateInstance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(estateInstance);
  }

  private getInstanceWithRelations = async (
    instance: Estate & {
      agency: Agency;
      type: EstateType;
      features: EstateFeature[];
    },
  ): Promise<EstateInstance> => {
    const featurePromises = instance.features.map((featureEstate) =>
      this.featureRepository
        .getFeatureById(featureEstate.featureId)
        .then((feature) => ({ ...featureEstate, feature })),
    );

    const features = await Promise.all(featurePromises);

    return {
      ...instance,
      features,
    };
  };

  private getPrices(filter: FilterEstates) {
    const pricesFilter = Object.entries(filter).reduce(
      (acc, [key, value]) => {
        if (!key.includes('.')) return acc;

        const [type, subKey] = key.split('.');

        const price = acc.find((price) => price.type === type.toUpperCase());

        if (price) {
          price[subKey] = value;
        } else {
          acc.push({
            type: type.toUpperCase() as 'RENT' | 'SALE',
            [subKey]: value,
          });
        }

        return acc;
      },
      [] as { type: 'RENT' | 'SALE'; min?: number; max?: number }[],
    );

    const pricesArray = pricesFilter?.map((price) => ({
      value: {
        gte: price.min,
        lte: price.max,
      },
      type: price.type,
    }));

    return pricesArray.length ? { some: { OR: pricesArray } } : undefined;
  }
}
