import { IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginDto {
  @ApiModelProperty({
    description: 'username, must be valid (Alvarito default)',
  })
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  username: string;

  @ApiModelProperty({
    description: 'password, must be valid (1324567890 default)',
  })
  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  password: string;
}
