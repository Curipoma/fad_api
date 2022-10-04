import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from '@core/dto';

export class FilterMaterialsDto extends PartialType(PaginationDto) {
  /* @IsOptional()
  @IsString()
  @IsDateString()
  readonly purchasedAt: Date;*/

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly initialExistence: string;

  @IsOptional()
  @IsString()
  readonly annualExistence: string;

  @IsOptional()
  @IsString()
  readonly unitValue: string;

  @IsOptional()
  @IsString()
  readonly totalValue: string;

  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  readonly fullAmountValue: string;

  @IsOptional()
  @IsString()
  readonly unitQuantityValue: string;
}
