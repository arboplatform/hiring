import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsBoolean,
  IsMongoId,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Address } from '@infra/http/rest/dto/enum/address';
import { Price } from '@infra/http/rest/dto/enum/price';

import { FeatureDto } from '../../enum/featureDto';

export class CreateEstateInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @IsMongoId()
  agencyId: string;

  @IsMongoId()
  typeId: string;

  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => Price)
  prices: Price[];

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features?: FeatureDto[];
}
