import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CatalogueTypeEntity } from "@core/entities";

export class CreateCatalogueDto {
  @IsNotEmpty({ message: 'type, must be a object CatalogueTypeEntity' })
  readonly type: CatalogueTypeEntity;

  @IsString({ message: 'name, Debe ser un string' })
  @MinLength(3, { message: 'name, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'name, Maximo 255 caracteres' })
  readonly name: string;
}
