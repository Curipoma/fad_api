import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { AuthService, UsersService } from '@auth/services';
import { ResponseHttpModel } from '@shared/models';
import { PublicRoute } from '@auth/decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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

  @ApiOperation({ summary: 'User Login' })
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
}
