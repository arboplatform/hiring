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
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: boolean;

  // @IsOptional()
  // @IsString()
  // street?: string;

  // @IsOptional()
  // @IsString()
  // city?: string;

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

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  'rent.min'?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  'rent.max'?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  'sale.min'?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  'sale.max'?: number;
}
