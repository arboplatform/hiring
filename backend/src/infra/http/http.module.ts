import { Module } from '@nestjs/common';

import { UseCasesModule } from '@application/use-cases/use-cases.module';

import { EstateController } from '@infra/http/rest/controller/estate.controller';

import { EstateTypeController } from './rest/controller/estateType.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [EstateController, EstateTypeController],
})
export class HttpModule {}
