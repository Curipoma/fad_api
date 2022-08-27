import { PartialType } from '@nestjs/swagger';
import { CreateConsumablesDto } from '@core/dto';

export class UpdateConsumablesDto extends PartialType(CreateConsumablesDto) {}
