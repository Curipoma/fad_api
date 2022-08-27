import { PartialType } from '@nestjs/swagger';
import { CreateAssetDetailsDto } from '@core/dto';

export class UpdateAssetDetailsDto extends PartialType(CreateAssetDetailsDto) {}
