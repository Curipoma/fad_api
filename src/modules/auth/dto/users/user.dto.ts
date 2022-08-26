import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsArray,
  MaxLength,
  IsDate,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isEmailValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';
import { CatalogueEntity } from '@core/entities';

export class UserDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsEmail({}, isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsEmail(isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly emailVerifiedAt: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly lastname: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  @MinLength(8, minLengthValidationOptions())
  @MaxLength(32, minLengthValidationOptions())
  readonly password: string;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly passwordChanged: boolean;

  @IsOptional()
  @IsEmail({}, isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly personalEmail: string;

  @IsOptional()
  @MaxLength(20, minLengthValidationOptions())
  readonly phone: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  @MinLength(5, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly username: string;
}
