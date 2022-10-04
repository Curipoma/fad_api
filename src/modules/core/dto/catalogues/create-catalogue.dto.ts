import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CatalogueTypeEntity } from '@core/entities';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateCatalogueDto {
  @ApiModelProperty({})
  @IsNotEmpty({
    message: 'type, debe ser un objeto de tipo CatalogueTypeEntity',
  })
  readonly type: CatalogueTypeEntity;

  @ApiModelProperty({})
  @IsString({ message: 'name, debe ser un string' })
  @MinLength(1, { message: 'name, mínimo 3 caracteres' })
  @MaxLength(255, { message: 'name, maximo 255 caracteres' })
  readonly name: string;
}
