import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PrismaEstateRepository } from '@infra/database/prisma/repositories/prisma-estate.repository';
import { PrismaFeatureRepository } from '@infra/database/prisma/repositories/prisma-feature.repository';
import { EstateRepository } from '@infra/database/repositories/estate.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';

import { CreateEstateUseCase } from './estates/create-estate-use-case';
import { EditEstateUseCase } from './estates/edit-estate-use-case';
import { GetEstateBySlugUseCase } from './estates/get-estate-by-slug-use-case';
import { PageEstatesUseCase } from './estates/page-estates-use-case';
import { RemoveEstateUseCase } from './estates/remove-estate-use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: EstateRepository,
      useClass: PrismaEstateRepository,
    },
    {
      provide: FeatureRepository,
      useClass: PrismaFeatureRepository,
    },
    CreateEstateUseCase,
    EditEstateUseCase,
    RemoveEstateUseCase,
    PageEstatesUseCase,
    GetEstateBySlugUseCase,
  ],
  exports: [
    CreateEstateUseCase,
    EditEstateUseCase,
    RemoveEstateUseCase,
    PageEstatesUseCase,
    GetEstateBySlugUseCase,
  ],
})
export class EstatesUseCasesModule {}
