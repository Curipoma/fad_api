import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateAreasDto {
  @ApiModelProperty({})
  @IsString({ message: 'name debe ser un string' })
  @MinLength(1, { message: 'name, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'name, Maximo 255 caracteres' })
  readonly name: string;

  @ApiModelProperty({})
  @IsString({ message: 'unitValue debe ser un string' })
  @MinLength(1, { message: 'unitValue, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'unitValue, Maximo 255 caracteres' })
  readonly unitValue: string;

  @ApiModelProperty({})
  @IsString({ message: 'code, debe ser un string' })
  @MinLength(1, { message: 'code, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'code, Maximo 255 caracteres' })
  readonly code: string;

  @ApiModelProperty({})
  @IsString({ message: 'totalValue debe ser un string' })
  @MinLength(1, { message: 'totalValue, El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'totalValue, Maximo 255 caracteres' })
  readonly totalValue: string;
}
