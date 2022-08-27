import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterAssetDetailsDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  readonly annualExistence: string;

  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly initialExistence: string;

  @IsOptional()
  @IsString()
  readonly unitValue: string;

  @IsOptional()
  @IsString()
  readonly value: string;
}
