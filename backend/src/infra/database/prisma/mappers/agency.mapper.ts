import { Agency } from '@prisma/client';

import { Agency as AgencyEntity, AgencyProps } from '@domain/entities/agency';

export type AgencyInstance = Agency;

export class AgencyMapper {
  static toEntity(instance: AgencyInstance): AgencyEntity {
    const { id } = instance;

    const props: AgencyProps = {
      name: instance.name,
      description: instance.description,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return new AgencyEntity(props, id);
  }

  static toInstance(entity: AgencyEntity): AgencyInstance {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
