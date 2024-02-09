import { Module } from '@nestjs/common';

import { EstatesUseCasesModule } from './estates-use-cases.module';
import { EstateTypesUseCasesModule } from './estateTypes-use-cases.module';

@Module({
  imports: [EstatesUseCasesModule, EstateTypesUseCasesModule],
  exports: [EstatesUseCasesModule, EstateTypesUseCasesModule],
})
export class UseCasesModule {}
