import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Estate as EstateEntity } from '@domain/entities/estate';

import {
  EstateRepository,
  FilterEstates,
  PageEstates,
  CreateEstate,
  UpdateEstateRequest,
} from '@infra/database/repositories/estate.repository';

import { PrismaError } from '../errors/prisma-error';
import { EstateMapper } from '../mappers/estate.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEstateRepository implements EstateRepository {
  constructor(private prisma: PrismaService) {}

  async createEstate(estate: CreateEstate): Promise<EstateEntity> {
    // TODO: add possibility to create own slug
    const slug = estate.name.toLowerCase().replace(/ /g, '-');

    const instance = await this.prisma.estate
      .create({
        include: {
          agency: true,
          type: true,
          features: {
            include: {
              feature: {
                include: { category: true },
              },
            },
          },
        },
        data: { ...estate, slug },
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaError(e.code).getError();
      });

    return EstateMapper.toEntity(instance);
  }

  async updateEstate(estate: UpdateEstateRequest): Promise<EstateEntity> {
    const { id, features = [], ...data } = estate;

    const allFeatures = await this.prisma.estateFeature.findMany({
      select: { id: true, featureId: true },
      where: { estateId: id },
    });

    const filtersToDelete = allFeatures.filter(
      (feature) =>
        !features.some(({ featureId }) => featureId === feature.featureId),
    );

    const instance = await this.prisma.estate.update({
      include: {
        agency: true,
        type: true,
        features: {
          include: {
            feature: {
              include: { category: true },
            },
          },
        },
      },
      where: { id },
      data: {
        ...data,
        features: {
          upsert: features.map((feature) => ({
            where: {
              UniqueEstateFeature: {
                estateId: id,
                featureId: feature.featureId,
              },
            },
            create: feature,
            update: feature,
          })),
          deleteMany: filtersToDelete.map((feature) => ({ id: feature.id })),
        },
      },
    });

    return EstateMapper.toEntity(instance);
  }

  async getEstateById(id: string) {
    const estate = await this.prisma.estate.findUnique({
      include: {
        agency: true,
        type: true,
        features: {
          include: {
            feature: {
              include: { category: true },
            },
          },
        },
      },
      where: { id },
    });

    if (!estate) return null;

    return EstateMapper.toEntity(estate);
  }

  async getEstateBySlug(slug: string): AsyncMaybe<EstateEntity> {
    const estate = await this.prisma.estate.findUnique({
      include: {
        agency: true,
        type: true,
        features: {
          include: {
            feature: {
              include: { category: true },
            },
          },
        },
      },
      where: { slug },
    });

    if (!estate) return null;

    return EstateMapper.toEntity(estate);
  }

  async pageEstates({
    filter,
    limit,
    offset,
  }: PageEstates): AsyncMaybe<EstateEntity[]> {
    const prices = this.getPrices(filter);

    const estateFound = await this.prisma.estate.findMany({
      include: {
        agency: true,
        type: true,
        features: {
          include: {
            feature: {
              include: { category: true },
            },
          },
        },
      },
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

    return estateFound.map(EstateMapper.toEntity);
  }

  countEstates(filter: FilterEstates): Promise<number> {
    const prices = this.getPrices(filter);

    return this.prisma.estate.count({
      where: {
        name: { contains: filter.name },
        slug: { contains: filter.slug },
        description: { contains: filter.description },
        active: filter.active,

        agencyId: filter.agencyId,
        typeId: filter.typeId,

        prices,
      },
    });
  }

  async deleteEstate(id: string): Promise<EstateEntity> {
    const estateFeatures = await this.prisma.estateFeature.findMany({
      include: {
        feature: {
          include: { category: true },
        },
      },
      where: { estateId: id },
    });

    await this.prisma.estateFeature.deleteMany({ where: { estateId: id } });

    const estate = await this.prisma.estate.delete({
      include: { agency: true, type: true },
      where: { id },
    });

    return EstateMapper.toEntity({
      ...estate,
      features: estateFeatures,
    });
  }

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
