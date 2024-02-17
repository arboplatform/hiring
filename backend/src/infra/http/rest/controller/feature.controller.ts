import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PageFeaturesUseCase } from '@application/use-cases/features/page-features-use-case';

import { PageFeatureInput } from '../dto/input/feature/page-features-input';
import { FeatureViewModel } from '../view-models/feature.view-model';

@Controller('features')
export class FeatureController {
  constructor(private pageFeatureUseCase: PageFeaturesUseCase) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async features(@Query() query: PageFeatureInput) {
    const { offset = 0, limit = 10, ...filter } = query || {};

    const result = await this.pageFeatureUseCase.handle({
      filter,
      offset,
      limit,
    });

    return {
      ...result,
      nodes: result.nodes
        ? result.nodes.map(FeatureViewModel.toResponse)
        : null,
    };
  }
}
