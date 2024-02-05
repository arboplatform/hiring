import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateEstateUseCase } from '@application/use-cases/estates/create-estate-use-case';
import { EditEstateUseCase } from '@application/use-cases/estates/edit-estate-use-case';
import { PageEstatesUseCase } from '@application/use-cases/estates/page-estates-use-case';
import { RemoveEstateUseCase } from '@application/use-cases/estates/remove-estate-use-case';

import { CreateEstateInput } from '../dto/input/estate/create-estate-input';
import { EditChallengeInput } from '../dto/input/estate/edit-challenge-input';
import { PageEstateInput } from '../dto/input/estate/page-estates-input';
import { EstateViewModel } from '../view-models/estate.view-model';

@Controller('estates')
export class EstateController {
  constructor(
    private createEstateUseCase: CreateEstateUseCase,
    private editEstateUseCase: EditEstateUseCase,
    private removeEstateUseCase: RemoveEstateUseCase,
    private pageEstateUseCase: PageEstatesUseCase,
  ) {}

  @Post('/create')
  async createEstate(@Body() body: CreateEstateInput) {
    const data = {
      ...body,
      agency: { connect: { id: body.agencyId } },
      type: { connect: { id: body.typeId } },
    };

    delete data.agencyId;
    delete data.typeId;

    const entity = await this.createEstateUseCase.handle(data);

    return EstateViewModel.toResponse(entity);
  }

  @Put('/edit/:id')
  async editEstate(@Param('id') id: string, @Body() body: EditChallengeInput) {
    const type = body.typeId ? { connect: { id: body.typeId } } : undefined;

    const agency = body.agencyId
      ? { connect: { id: body.agencyId } }
      : undefined;

    const data = { id, ...body, type, agency };

    delete data.agencyId;
    delete data.typeId;

    const entity = await this.editEstateUseCase.handle(data);

    return EstateViewModel.toResponse(entity);
  }

  @Delete('/remove/:id')
  async removeEstate(@Param('id') id: string) {
    const entity = await this.removeEstateUseCase.handle({ id });

    return EstateViewModel.toResponse(entity);
  }

  @Get()
  async estates(@Query() query: PageEstateInput) {
    const { offset = 0, limit = 10, ...filter } = query || {};

    const result = await this.pageEstateUseCase.handle({
      filter,
      offset,
      limit,
    });

    return {
      ...result,
      nodes: result.nodes ? result.nodes.map(EstateViewModel.toResponse) : null,
    };
  }
}
