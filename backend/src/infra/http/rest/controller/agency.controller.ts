import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PageAgenciesUseCase } from '@application/use-cases/agencies/page-agencies-use-case';

import { PageAgencyInput } from '../dto/input/agency/page-agencies-input';
import { AgencyViewModel } from '../view-models/agency.view-model';

@Controller('agencies')
export class AgencyController {
  constructor(private pageAgencyUseCase: PageAgenciesUseCase) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async agencies(@Query() query: PageAgencyInput) {
    const { offset = 0, limit = 10, ...filter } = query || {};

    const result = await this.pageAgencyUseCase.handle({
      filter,
      offset,
      limit,
    });

    return {
      ...result,
      nodes: result.nodes ? result.nodes.map(AgencyViewModel.toResponse) : null,
    };
  }
}
