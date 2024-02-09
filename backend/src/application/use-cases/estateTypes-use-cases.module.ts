import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PrismaEstateTypeRepository } from '@infra/database/prisma/repositories/prisma-estateType.repository';
import { EstateTypeRepository } from '@infra/database/repositories/estateType.repository';

import { PageEstateTypesUseCase } from './estateTypes/page-estateTypes-use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: EstateTypeRepository,
      useClass: PrismaEstateTypeRepository,
    },
    PageEstateTypesUseCase,
  ],
  exports: [PageEstateTypesUseCase],
})
export class EstateTypesUseCasesModule {}
