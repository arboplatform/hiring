import { Agency as AgencyEntity } from '@domain/entities/agency';

import { AgencyResponse } from '../dto/models/agency';

export class AgencyViewModel {
  static toResponse(agency: AgencyEntity): AgencyResponse {
    return {
      id: agency.id,
      name: agency.name,
      description: agency.description,

      createdAt: agency.createdAt.toISOString(),
      updatedAt: agency.updatedAt.toISOString(),
    };
  }
}
