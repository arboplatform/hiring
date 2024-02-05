import { Min, Max } from 'class-validator';

export class PaginationArgs {
  @Min(0)
  offset = 0;

  @Min(0)
  @Max(20)
  limit = 10;
}
