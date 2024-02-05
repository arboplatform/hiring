import { IsBoolean, IsPositive, IsString } from 'class-validator';

export class FeatureDto {
  @IsString()
  featureId: string;

  @IsPositive()
  amount: number;

  @IsBoolean()
  showAmount: boolean;
}
