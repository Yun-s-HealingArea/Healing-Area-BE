import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginateDTO {
  @Transform(({ value }) => parseInt(value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 10;
}
