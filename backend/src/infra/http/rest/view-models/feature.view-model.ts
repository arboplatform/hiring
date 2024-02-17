import { Feature as FeatureEntity } from '@domain/entities/feature';

import { FeatureResponse } from '../dto/models/feature';

export class FeatureViewModel {
  static toResponse(feature: FeatureEntity): FeatureResponse {
    return {
      id: feature.id,
      name: feature.name,
      active: feature.active,

      singular: feature.singular,
      plural: feature.plural,
      unit: feature.unit,

      categoryId: feature.category.id,
      category: {
        id: feature.category.id,
        name: feature.category.name,

        createdAt: feature.category.createdAt.toISOString(),
        updatedAt: feature.category.updatedAt.toISOString(),
      },

      createdAt: feature.createdAt.toISOString(),
      updatedAt: feature.updatedAt.toISOString(),
    };
  }
}
