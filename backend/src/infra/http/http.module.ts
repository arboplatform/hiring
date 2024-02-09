import { Module } from '@nestjs/common';

import { UseCasesModule } from '@application/use-cases/use-cases.module';

import { AgencyController } from '@infra/http/rest/controller/agency.controller';
import { EstateController } from '@infra/http/rest/controller/estate.controller';
import { EstateTypeController } from '@infra/http/rest/controller/estateType.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [EstateController, EstateTypeController, AgencyController],
})
export class HttpModule {}
