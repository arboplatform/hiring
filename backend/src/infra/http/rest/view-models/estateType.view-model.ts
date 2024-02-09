import { EstateType as EstateTypeEntity } from '@domain/entities/estateType';

import { EstateTypeResponse } from '../dto/models/estateType';

export class EstateTypeViewModel {
  static toResponse(estateType: EstateTypeEntity): EstateTypeResponse {
    return {
      id: estateType.id,
      name: estateType.name,

      createdAt: estateType.createdAt.toISOString(),
      updatedAt: estateType.updatedAt.toISOString(),
    };
  }
}
