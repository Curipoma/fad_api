import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCatalogueTypesDto {
  @IsString({ message: 'name, Debe ser un string' })
  @MinLength(1, { message: 'name, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'name, Maximo 255 caracteres' })
  readonly name: string;
}
