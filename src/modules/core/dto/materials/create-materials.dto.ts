import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateMaterialsDto {
  @ApiModelProperty({})
  @IsString({ message: 'code, debe ser un string' })
  @MinLength(1, { message: 'code, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'code, maximo 255 caracteres' })
  readonly description: string;

  @ApiModelProperty({})
  @IsString({ message: 'initialExistence, debe ser un string' })
  @MinLength(1, { message: 'initialExistence, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'initialExistence, maximo 255 caracteres' })
  readonly initialExistence: string;

  @ApiModelProperty({})
  @IsString({ message: 'annualExistence, debe ser un string' })
  @MinLength(1, { message: 'annualExistence, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'annualExistence, maximo 255 caracteres' })
  readonly annualExistence: string;

  @ApiModelProperty({})
  @IsString({ message: 'unitValue debe ser un string' })
  @MinLength(1, { message: 'unitValue, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'unitValue, maximo 255 caracteres' })
  readonly unitValue: string;

  @ApiModelProperty({})
  @IsString({ message: 'totalValue, debe ser un string' })
  @MinLength(1, { message: 'totalValue, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'totalValue, maximo 255 caracteres' })
  readonly totalValue: string;

  @ApiModelProperty({})
  @IsString({ message: 'code, debe ser un string' })
  @MinLength(1, { message: 'code, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'code, maximo 255 caracteres' })
  readonly code: string;
}
