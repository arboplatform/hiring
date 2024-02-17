import { IsOptional, IsString } from 'class-validator';

import { PaginationArgs } from '../../../common/dto/args/pagination-args';

export class PageEstateTypeInput extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;
}
