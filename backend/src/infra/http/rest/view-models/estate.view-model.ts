import { Estate as EstateEntity } from '@domain/entities/estate';

import { Estate } from '../dto/models/estate';

export class EstateViewModel {
  static toResponse(estate: EstateEntity): Estate {
    return {
      id: estate.id,
      name: estate.name,
      slug: estate.slug,
      description: estate.description,
      active: estate.active,

      address: estate.address,
      agency: estate.agency,
      type: estate.type,

      prices: estate.prices,
      features: estate.features,

      createdAt: estate.createdAt,
    };
  }
}
