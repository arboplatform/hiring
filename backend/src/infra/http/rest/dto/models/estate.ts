import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Agency } from '@domain/entities/agency';
import { EstateFeature } from '@domain/entities/estateFeature';
import { EstateType } from '@domain/entities/estateType';

import { Address } from '@infra/http/rest/dto/enum/address';
import { Price } from '@infra/http/rest/dto/enum/price';

export class Estate {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @IsNotEmptyObject()
  agency: Agency;

  @IsNotEmptyObject()
  type: EstateType;

  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => Price)
  prices: Price[];

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EstateFeature)
  features?: EstateFeature[];

  @IsDate()
  createdAt: Date;
}
