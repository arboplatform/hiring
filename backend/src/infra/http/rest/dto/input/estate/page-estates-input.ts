import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { PaginationArgs } from '../../../common/dto/args/pagination-args';

export class PageEstateInput extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  // @IsOptional()
  // @IsString()
  // street?: string;

  // @IsOptional()
  // @IsString()
  // city?: string;

  // @Transform(({ value }) => Number(value))
  // @IsOptional()
  // @IsPositive()
  // number?: number;

  // @IsOptional()
  // @IsString()
  // state?: string;

  // @IsOptional()
  // @Matches(/^[0-9]{5}-[0-9]{3}$/)
  // zip?: string;

  @IsOptional()
  @IsMongoId()
  agencyId?: string;

  @IsOptional()
  @IsMongoId()
  typeId?: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  'rent.min'?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  'rent.max'?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  'sale.min'?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  'sale.max'?: number;
}
