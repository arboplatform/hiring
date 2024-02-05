import { Module } from '@nestjs/common';

import { UseCasesModule } from '@application/use-cases/use-cases.module';

import { EstateController } from '@infra/http/rest/controller/estate.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [EstateController],
})
export class HttpModule {}
