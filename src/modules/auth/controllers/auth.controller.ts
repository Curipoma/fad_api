import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, PublicRoute, User } from '@auth/decorators';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { LoginDto, PasswordChangeDto } from '@auth/dto';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Auth')
@Auth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: LoginDto): Promise<ResponseHttpModel<object>> {
    const { data } = await this.authService.login(payload);

    return {
      data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }

  @ApiOperation({ summary: 'Change Password' })
  @Put(':id/change-password')
  @HttpCode(HttpStatus.CREATED)
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpModel<object>> {
    const { data } = await this.authService.changePassword(id, payload);

    return {
      data,
      message: 'The password was changed',
      title: 'Password Changed',
    };
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @Get('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(
    @User() user: UserEntity,
  ): Promise<ResponseHttpModel<object>> {
    const { data } = await this.authService.refreshToken(user);

    return {
      data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }
}