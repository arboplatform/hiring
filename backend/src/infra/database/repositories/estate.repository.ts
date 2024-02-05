import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { Estate, EstateProps } from '@domain/entities/estate';

import { Address } from '@infra/http/rest/dto/enum/address';
import { FeatureDto } from '@infra/http/rest/dto/enum/featureDto';

// createdAt and updatedAt are generated automatically
export type EstateRequest = Omit<EstateProps, 'createdAt' | 'updatedAt'>;

// References are given by their IDs
// in MongoDB, references must be given by prisma's connect attribute
export type EstateWithoutReferences = Omit<
  EstateRequest,
  'agency' | 'type' | 'agencyId' | 'typeId' | 'features'
>;

// slug is generated automatically
export type CreateEstate = Omit<EstateWithoutReferences, 'slug' | 'active'> & {
  agency: { connect: { id: string } };
  type: { connect: { id: string } };
  features?: FeatureDto[];
  active?: boolean;
};

export type FilterEstates = Partial<
  Address &
    Omit<EstateRequest, 'address' | 'prices' | 'features'> & {
      'rent.min': number;
      'rent.max': number;
      'sale.min': number;
      'sale.max': number;
    }
>;

export type UpdateEstateRequest = {
  id: string;
} & Partial<
  EstateWithoutReferences & {
    agency: { connect: { id: string } };
    type: { connect: { id: string } };
    features: Partial<FeatureDto>[];
  }
>;

export type PageEstates = {
  filter: FilterEstates;
  offset: number;
  limit: number;
};

@Injectable()
export abstract class EstateRepository {
  abstract countEstates(filter: FilterEstates): Promise<number>;
  abstract pageEstates(filter: PageEstates): AsyncMaybe<Estate[]>;

  abstract createEstate(estate: CreateEstate): Promise<Estate>;
  abstract updateEstate(estate: UpdateEstateRequest): Promise<Estate>;

  abstract getEstateBySlug(slug: string): AsyncMaybe<Estate>;
  abstract getEstateById(id: string): AsyncMaybe<Estate>;

  abstract deleteEstate(id: string): Promise<Estate>;
}
