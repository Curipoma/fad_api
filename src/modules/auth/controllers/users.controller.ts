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
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { UsersService } from '@auth/services';
import { ResponseHttpModel } from '@shared/models';
import { AppRoles } from '../../../app.roles';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateUserDto,
  ): Promise<ResponseHttpModel<UserEntity>> {
    const { data } = await this.usersService.create({
      ...payload,
    });

    return {
      data,
      message: 'User created',
      title: 'Created',
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
      pagination,
      message: `index`,
      title: 'Success',
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
      message: `show ${id}`,
      title: `Success`,
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
      message: `User updated ${id}`,
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
      message: `User deleted ${id}`,
      title: `Deleted`,
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
      message: `Users deleted`,
      title: `Deleted`,
    };
  }
}
