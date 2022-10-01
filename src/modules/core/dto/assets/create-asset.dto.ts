import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class CreateAssetDto {
  @IsNotEmpty({ message: 'type must be a object' })
  readonly type: CatalogueEntity;

  @IsString({ message: 'code must be a string' })
  @MinLength(1, { message: 'code, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;

  @IsString({ message: 'monetaryValue must be a string' })
  @MinLength(1, {
    message: 'monetaryValue, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'monetaryValue, Maximo 255 caracteres' })
  readonly monetaryValue: string;
}
