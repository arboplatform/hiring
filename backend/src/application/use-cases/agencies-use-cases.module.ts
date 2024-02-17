import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PrismaAgencyRepository } from '@infra/database/prisma/repositories/prisma-agency.repository';
import { AgencyRepository } from '@infra/database/repositories/agency.repository';

import { PageAgenciesUseCase } from './agencies/page-agencies-use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: AgencyRepository,
      useClass: PrismaAgencyRepository,
    },
    PageAgenciesUseCase,
  ],
  exports: [PageAgenciesUseCase],
})
export class AgenciesUseCasesModule {}
