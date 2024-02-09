import { EstateType as EstateTypeEntity } from '@domain/entities/estateType';

import { EstateTypeResponse } from '../dto/models/estateType';

export class EstateTypeViewModel {
  static toResponse(estate: EstateTypeEntity): EstateTypeResponse {
    return {
      id: estate.id,
      name: estate.name,

      createdAt: estate.createdAt.toISOString(),
      updatedAt: estate.updatedAt.toISOString(),
    };
  }
}
