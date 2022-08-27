import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AssetEntity, MaterialEntity } from '@core/entities';

export class CreateConsumablesDto {
  @IsNotEmpty({ message: 'asset must be a object' })
  readonly asset: AssetEntity;

  @IsString({ message: 'amount must be a string' })
  @MinLength(3, { message: 'amount, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'amount, Maximo 255 caracteres' })
  readonly amount: string;

  @IsString({ message: 'code must be a string' })
  @MinLength(3, { message: 'code, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;

  @IsString({ message: 'description must be a string' })
  @MinLength(3, {
    message: 'description, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'description, Maximo 255 caracteres' })
  readonly description: string;

  @IsString({ message: 'totalValue must be a string' })
  @MinLength(3, { message: 'totalValue, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'totalValue, Maximo 255 caracteres' })
  readonly totalValue: string;

  @IsString({ message: 'unitValue must be a string' })
  @MinLength(3, { message: 'unitValue, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'unitValue, Maximo 255 caracteres' })
  readonly unitValue: string;
}
