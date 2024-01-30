import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StatusEnum } from '../../enums';

export class FilterAddressDto {
  @IsString()
  @IsOptional()
  street?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  state?: string;
  @IsString()
  @IsOptional()
  zipCode?: string;
}
export class FilterPropertyDto {
  @IsString()
  @IsOptional()
  _id?: string;
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsOptional()
  price?: number;
  @IsNumber()
  @IsOptional()
  area?: number;
  @IsString()
  @IsOptional()
  type?: string;
  @ValidateNested()
  @Type(() => FilterAddressDto)
  @IsOptional()
  address?: FilterAddressDto;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
  @IsEnum(StatusEnum)
  @IsOptional()
  status?: StatusEnum;
}
