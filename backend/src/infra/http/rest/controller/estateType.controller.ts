import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PageEstateTypesUseCase } from '@application/use-cases/estateTypes/page-estateTypes-use-case';

import { PageEstateTypeInput } from '../dto/input/estateType/page-estateTypes-input';
import { EstateTypeViewModel } from '../view-models/estateType.view-model';

@Controller('estate-types')
export class EstateTypeController {
  constructor(private pageEstateTypeUseCase: PageEstateTypesUseCase) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async estateTypes(@Query() query: PageEstateTypeInput) {
    const { offset = 0, limit = 10, ...filter } = query || {};

    const result = await this.pageEstateTypeUseCase.handle({
      filter,
      offset,
      limit,
    });

    return {
      ...result,
      nodes: result.nodes
        ? result.nodes.map(EstateTypeViewModel.toResponse)
        : null,
    };
  }
}
