import { IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginDto {
  @ApiModelProperty({})
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  email: string;

  @ApiModelProperty({})
  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  password: string;
}
