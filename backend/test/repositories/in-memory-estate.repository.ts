import { Injectable } from '@nestjs/common';
import { Agency, Estate, EstateFeature, EstateType } from '@prisma/client';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Estate as EstateEntity } from '@domain/entities/estate';

import {
  EstateInstance,
  EstateMapper,
} from '@infra/database/prisma/mappers/estate.mapper';
import { AgencyRepository } from '@infra/database/repositories/agency.repository';
import {
  CreateEstate,
  EstateRepository,
  FilterEstates,
  PageEstates,
  UpdateEstateRequest,
} from '@infra/database/repositories/estate.repository';
import { EstateFeatureRepository } from '@infra/database/repositories/estateFeature.repository';
import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';

type EstateWithRelations = Estate & {
  agency: Agency;
  type: EstateType;
  features: EstateFeature[];
};

@Injectable()
export class InMemoryEstateRepository implements EstateRepository {
  private items: EstateWithRelations[] = [];

  constructor(
    private estateFeatureRepository: EstateFeatureRepository,
    private featureRepository: FeatureRepository,
    private agencyRepository: AgencyRepository,
    private estateTypeRepository: EstateTypeRepository,
  ) {}

  private filterItemsByProps(filter: FilterEstates): EstateWithRelations[] {
    return this.items.filter((estate) => {
      return estate.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        estate.description
          .toLowerCase()
          .includes(filter.description.toLowerCase()) &&
        estate.slug.toLowerCase().includes(filter.slug.toLowerCase()) &&
        filter.active
        ? estate.active === filter.active
        : true &&
            (filter.address.city
              ? estate.address.city
                  .toLowerCase()
                  .includes(filter.address.city.toLowerCase())
              : true) &&
            (filter.address.state
              ? estate.address.state
                  .toLowerCase()
                  .includes(filter.address.state.toLowerCase())
              : true) &&
            (filter.address.street
              ? estate.address.street
                  .toLowerCase()
                  .includes(filter.address.street.toLowerCase())
              : true) &&
            (filter.address.zip
              ? estate.address.zip.includes(filter.address.zip)
              : true) &&
            (filter.prices
              ? filter.prices.some((price) =>
                  estate.prices.some(
                    (estatePrice) =>
                      estatePrice.type === price.type &&
                      estatePrice.value >= price.min &&
                      estatePrice.value <= price.max,
                  ),
                )
              : true);
    });
  }

  async pageEstates({
    filter,
    limit,
    offset,
  }: PageEstates): AsyncMaybe<EstateEntity[]> {
    const estates = this.filterItemsByProps(filter).slice(
      offset,
      offset + limit,
    );

    if (!estates.length) return null;

    const estateInstances = await Promise.all(
      estates.map(this.getInstanceWithRelations),
    );

    return estateInstances.map(EstateMapper.toEntity);
  }

  async countEstates(filter: FilterEstates): Promise<number> {
    return this.filterItemsByProps(filter).length;
  }

  async getEstateById(id: string) {
    const estate = this.items.find((estate) => estate.id === id);

    if (!estate) return null;

    const instance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(instance);
  }

  async getEstateBySlug(slug: string) {
    const estate = this.items.find((estate) => estate.slug === slug);

    if (!estate) return null;

    const instance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(instance);
  }

  async createEstate(estate: CreateEstate): Promise<EstateEntity> {
    const slug = estate.name.toLowerCase().replace(/ /g, '-');

    const agency = await this.agencyRepository.getAgencyById(
      estate.agency.connect.id,
    );

    const type = await this.estateTypeRepository.getEstateTypeById(
      estate.type.connect.id,
    );

    const features = await Promise.all(
      estate.features.connect.map((feature) =>
        this.estateFeatureRepository.getEstateFeatureById(feature.id),
      ),
    );

    const entity = new EstateEntity({
      name: estate.name,
      description: estate.description,
      active: true,
      slug,

      address: estate.address,
      prices: estate.prices,

      agencyId: estate.agency.connect.id,
      agency: agency,

      typeId: estate.type.connect.id,
      type: type,

      features,

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const instance = EstateMapper.toInstance(entity);

    this.items.push(instance);

    return entity;
  }

  async updateEstate(estate: UpdateEstateRequest): Promise<EstateEntity> {
    const index = this.items.findIndex((item) => item.id === estate.id);

    const instance = this.items[index];

    this.items[index] = {
      ...instance,
      name: estate.name || instance.name,
      description: estate.description || instance.description,
      active: estate.active ?? instance.active,
      address: estate.address || instance.address,
      prices: estate.prices || instance.prices,
      agencyId: estate.agency?.connect?.id || instance.agencyId,
      typeId: estate.type?.connect?.id || instance.typeId,
      updatedAt: new Date(),
    };

    const newInstance = await this.getInstanceWithRelations(this.items[index]);

    return EstateMapper.toEntity(newInstance);
  }

  async deleteEstate(id: string): Promise<EstateEntity> {
    const index = this.items.findIndex((item) => item.id === id);

    const estate = this.items[index];

    this.items.splice(index, 1);

    const instance = await this.getInstanceWithRelations(estate);

    return EstateMapper.toEntity(instance);
  }

  private getInstanceWithRelations = async (
    instance: EstateWithRelations,
  ): Promise<EstateInstance> => {
    const featurePromises = instance.features.map((featureEstate) =>
      this.featureRepository
        .getFeatureById(featureEstate.id)
        .then((feature) => ({ ...featureEstate, feature })),
    );

    const features = await Promise.all(featurePromises);

    return {
      ...instance,
      features,
    };
  };
}
