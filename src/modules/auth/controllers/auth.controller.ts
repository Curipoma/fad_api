import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, User } from '@auth/decorators';
import { AuthService, UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { FilterUserDto, PasswordChangeDto, UpdateUserDto } from '@auth/dto';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Users')
@Auth()
@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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

  @ApiOperation({ summary: 'List of users' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterUserDto,
  ): Promise<ResponseHttpModel<UserEntity[]>> {
    const { data, pagination } = await this.usersService.findAll(params);

    return {
      data,
      message: `Found all users (search = ${params.search ?? 'empty'})`,
      pagination,
      title: 'Found all',
    };
  }

  @ApiOperation({ summary: 'Find User' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel<UserEntity>> {
    const { data } = await this.usersService.findOne(id);

    return {
      data,
      message: `Found one, user ${id}`,
      title: `Found one`,
    };
  }

  @ApiOperation({ summary: 'Update User' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<ResponseHttpModel<UserEntity>> {
    const { data } = await this.usersService.update(id, payload);

    return {
      data,
      message: `Updated, user ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove User' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel<UserEntity>> {
    const { data } = await this.usersService.remove(id);

    return {
      data,
      message: `Removed, user ${id}`,
      title: `Removed`,
    };
  }

  @ApiOperation({ summary: 'Remove All Users' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<UserEntity[]>> {
    const { data } = await this.usersService.removeAll(payload);

    return {
      data,
      message: `Removed all users ${payload.toString()}`,
      title: `Removed all`,
    };
  }
}
