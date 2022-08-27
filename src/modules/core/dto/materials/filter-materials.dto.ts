import { IsDateString, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from '@core/dto';

export class FilterMaterialsDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  readonly purchasedAt: Date;
}
