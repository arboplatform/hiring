import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  zipCode: string;
}
export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  area: number;
  @IsString()
  @IsNotEmpty()
  type: string;
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features: string[];
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  img: string[];
}
