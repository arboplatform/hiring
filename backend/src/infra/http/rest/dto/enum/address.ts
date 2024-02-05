import { IsNotEmpty, IsNumber } from 'class-validator';

export class Address {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zip: string;
}
