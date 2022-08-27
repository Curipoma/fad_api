import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AssetEntity } from '@core/entities';

export class CreateAssetDetailsDto {
  @IsNotEmpty({ message: 'asset must be a object' })
  readonly asset: AssetEntity;

  @IsString({ message: 'annualExistence must be a string' })
  @MinLength(3, {
    message: 'annualExistence, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'annualExistence, Maximo 255 caracteres' })
  readonly annualExistence: string;

  @IsString({ message: 'code must be a string' })
  @MinLength(3, {
    message: 'code, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;

  @IsString({ message: 'initialExistence must be a string' })
  @MinLength(3, {
    message: 'initialExistence, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'initialExistence, Maximo 255 caracteres' })
  readonly initialExistence: string;

  @IsString({ message: 'unitValue must be a string' })
  @MinLength(3, {
    message: 'unitValue, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'unitValue, Maximo 255 caracteres' })
  readonly unitValue: string;

  @IsString({ message: 'value must be a string' })
  @MinLength(3, {
    message: 'value, El número de caracteres mínimo es 3.',
  })
  @MaxLength(255, { message: 'value, Maximo 255 caracteres' })
  readonly value: string;
}
