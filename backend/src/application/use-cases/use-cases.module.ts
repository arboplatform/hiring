import { Module } from '@nestjs/common';

import { AgenciesUseCasesModule } from './agencies-use-cases.module';
import { EstatesUseCasesModule } from './estates-use-cases.module';
import { EstateTypesUseCasesModule } from './estateTypes-use-cases.module';

@Module({
  imports: [
    EstatesUseCasesModule,
    EstateTypesUseCasesModule,
    AgenciesUseCasesModule,
  ],
  exports: [
    EstatesUseCasesModule,
    EstateTypesUseCasesModule,
    AgenciesUseCasesModule,
  ],
})
export class UseCasesModule {}
