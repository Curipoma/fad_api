import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from '@core/dto';

export class FilterConsumablesDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly totalValue: string;

  @IsOptional()
  @IsString()
  readonly unitValue: string;
}
