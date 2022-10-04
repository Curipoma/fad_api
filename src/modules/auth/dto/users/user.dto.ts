import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  MaxLength,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isEmailValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
  @ApiModelProperty({})
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsEmail({}, isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly email: string;

  @ApiModelProperty({})
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsEmail(isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly emailVerifiedAt: string;

  @ApiModelProperty({})
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly lastname: string;

  @ApiModelProperty({})
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  @MinLength(8, minLengthValidationOptions())
  @MaxLength(32, minLengthValidationOptions())
  readonly password: string;

  @ApiModelProperty({})
  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly passwordChanged: boolean;

  @ApiModelProperty({})
  @IsOptional()
  @MaxLength(20, minLengthValidationOptions())
  readonly phone: string;

  @ApiModelProperty({})
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;
}
