import { PartialType } from '@nestjs/swagger';
import { CreateMaterialsDto } from '@core/dto';

export class UpdateMaterialsDto extends PartialType(CreateMaterialsDto) {}
