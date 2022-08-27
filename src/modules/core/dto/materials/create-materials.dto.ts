import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatalogueEntity, ConsumableEntity } from '@core/entities';

export class CreateMaterialsDto {
  @IsNotEmpty({ message: 'consumables must be a objects' })
  @IsOptional()
  readonly consumables: ConsumableEntity[];

  @IsNotEmpty({ message: 'type must be a object' })
  readonly type: CatalogueEntity;

  @IsString({ message: 'code, Debe ser un string' })
  @MinLength(3, { message: 'code, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;

  @IsString({ message: 'name, Debe ser un string' })
  @MinLength(3, { message: 'name, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'name, Maximo 255 caracteres' })
  readonly name: string;

  @IsDate({
    message: 'purchasedAt, debe ser una fecha, YYYY-MM-DDThh:mm:ssTZD',
  })
  readonly purchasedAt: Date;
}
