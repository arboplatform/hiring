import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationArgs } from '../../../common/dto/args/pagination-args';

export class PageFeatureInput extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: boolean;

  @IsOptional()
  @IsString()
  singular?: string;

  @IsOptional()
  @IsString()
  plural?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  categoryId: string;
}
