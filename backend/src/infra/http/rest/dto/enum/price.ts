import { IsEnum, IsPositive } from 'class-validator';

export enum PriceType {
  SALE = 'SALE',
  RENT = 'RENT',
}

export class Price {
  @IsPositive()
  value: number;

  @IsEnum(PriceType)
  type: PriceType;
}

export class PriceDto {
  @IsPositive()
  min: number;

  @IsPositive()
  max: number;

  @IsEnum(PriceType)
  type: PriceType;
}
