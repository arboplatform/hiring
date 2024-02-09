import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PrismaFeatureRepository } from '@infra/database/prisma/repositories/prisma-feature.repository';
import { FeatureRepository } from '@infra/database/repositories/feature.repository';

import { PageFeaturesUseCase } from './features/page-features-use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: FeatureRepository,
      useClass: PrismaFeatureRepository,
    },
    PageFeaturesUseCase,
  ],
  exports: [PageFeaturesUseCase],
})
export class FeaturesUseCasesModule {}
