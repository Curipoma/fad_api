import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { MaterialEntity } from '@core/entities';

export class CreateAreasDto {
  @ApiModelProperty({ type: 'number[]' })
  @IsNotEmpty({
    message: 'materials, debe ser una lista de objetos de tipo MaterialEntity',
  })
  materials: MaterialEntity[];

  @ApiModelProperty()
  @IsString({ message: 'name debe ser un string' })
  @MinLength(1, { message: 'name, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'name, Maximo 255 caracteres' })
  readonly name: string;

  @ApiModelProperty()
  @IsString({ message: 'unitValue debe ser un string' })
  @MinLength(1, { message: 'unitValue, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'unitValue, Maximo 255 caracteres' })
  readonly unitMonetaryValue: string;

  @ApiModelProperty()
  @IsString({ message: 'code, debe ser un string' })
  @MinLength(1, { message: 'code, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;
}
