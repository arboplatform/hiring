import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features: string[];
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  img: string[];
}
