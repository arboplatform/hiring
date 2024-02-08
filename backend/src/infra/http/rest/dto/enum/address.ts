import { IsPositive, IsString, Matches } from 'class-validator';

export class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsPositive()
  number: number;

  @IsString()
  state: string;

  @Matches(/^[0-9]{5}-[0-9]{3}$/)
  zip: string;
}
