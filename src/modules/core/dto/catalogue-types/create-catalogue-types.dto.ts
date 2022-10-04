import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateCatalogueTypesDto {
  @ApiModelProperty()
  @IsString({ message: 'name, debe ser un string' })
  @MinLength(1, { message: 'name, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'name, maximo 255 caracteres' })
  readonly name: string;

  @ApiModelProperty()
  @IsString({ message: 'value, debe ser un string' })
  @MinLength(1, { message: 'value, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'value, maximo 255 caracteres' })
  readonly value: string;
}
