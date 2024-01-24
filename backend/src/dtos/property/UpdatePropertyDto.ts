import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateAddressDto {
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
export class UpdatePropertyDto {
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
  @Type(() => UpdateAddressDto)
  @IsOptional()
  address?: UpdateAddressDto;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  img?: string[];
}
