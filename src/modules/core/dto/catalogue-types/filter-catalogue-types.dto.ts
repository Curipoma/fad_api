import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from "@core/dto";

export class FilterCatalogueTypesDto extends PartialType(
  PaginationDto,
) {
  @IsOptional()
  @IsString()
  readonly name: string;
}
