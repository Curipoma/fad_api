import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PasswordChangeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  confirmationPassword: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
