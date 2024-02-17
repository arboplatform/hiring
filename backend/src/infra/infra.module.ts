import { Module } from '@nestjs/common';

import { LoggerModule } from '@infra/logger/logger.module';

import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule, LoggerModule],
})
export class InfraModule {}
