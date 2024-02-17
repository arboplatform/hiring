import { IsOptional, IsString } from 'class-validator';

import { PaginationArgs } from '../../../common/dto/args/pagination-args';

export class PageAgencyInput extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
