import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from '@core/dto';

export class FilterAssetDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly monetaryValue: string;
}
