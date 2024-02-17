import { Estate as EstateEntity } from '@domain/entities/estate';

import { EstateResponse } from '../dto/models/estate';

export class EstateViewModel {
  static toResponse(estate: EstateEntity): EstateResponse {
    return {
      id: estate.id,
      name: estate.name,
      slug: estate.slug,
      description: estate.description,
      active: estate.active,

      address: estate.address,
      agency: {
        id: estate.agency.id,
        ...estate.agency.props,
        createdAt: estate.agency.createdAt.toISOString(),
        updatedAt: estate.agency.updatedAt.toISOString(),
      },
      type: {
        id: estate.type.id,
        ...estate.type.props,
        createdAt: estate.type.createdAt.toISOString(),
        updatedAt: estate.type.updatedAt.toISOString(),
      },

      prices: estate.prices,
      features: estate.features.map((feature) => ({
        ...feature.props,
        id: feature.id,
        feature: {
          id: feature.feature.id,
          ...feature.feature.props,
          category: {
            id: feature.feature.category.id,
            ...feature.feature.category.props,
            createdAt: feature.feature.category.createdAt.toISOString(),
            updatedAt: feature.feature.category.updatedAt.toISOString(),
          },
          createdAt: feature.feature.createdAt.toISOString(),
          updatedAt: feature.feature.updatedAt.toISOString(),
        },
        createdAt: feature.createdAt.toISOString(),
        updatedAt: feature.updatedAt.toISOString(),
      })),

      createdAt: estate.createdAt.toISOString(),
      updatedAt: estate.updatedAt.toISOString(),
    };
  }
}
