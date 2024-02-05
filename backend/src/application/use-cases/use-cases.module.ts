import { Module } from '@nestjs/common';

import { EstatesUseCasesModule } from './estates-use-cases.module';

@Module({
  imports: [EstatesUseCasesModule],
  exports: [EstatesUseCasesModule],
})
export class UseCasesModule {}
