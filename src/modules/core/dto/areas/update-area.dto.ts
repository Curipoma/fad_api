import { PartialType } from '@nestjs/swagger';
import { CreateAreasDto } from '@core/dto';

export class UpdateAreaDto extends PartialType(CreateAreasDto) {}
