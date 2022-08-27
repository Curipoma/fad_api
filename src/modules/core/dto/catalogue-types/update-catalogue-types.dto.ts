import { PartialType } from '@nestjs/swagger';
import { CreateCatalogueTypesDto } from '@core/dto';

export class UpdateCatalogueTypesDto extends PartialType(
  CreateCatalogueTypesDto,
) {}
