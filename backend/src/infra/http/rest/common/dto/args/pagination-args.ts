import { Transform } from 'class-transformer';
import { Min, Max } from 'class-validator';

export class PaginationArgs {
  @Transform(({ value }) => Number(value))
  @Min(0)
  offset = 0;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(20)
  limit = 10;
}
