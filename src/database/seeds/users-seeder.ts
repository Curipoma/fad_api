import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { UsersService } from '@auth/services';

@Injectable()
export class UsersSeeder {
  constructor(private usersService: UsersService) {}

  async run() {
    await this.createDefaultUser();
  }

  async createDefaultUser() {
    const users: CreateUserDto[] = [];
    users.push({
      email: 'dev@fad.dev',
      lastname: 'Curipoma',
      name: 'Alvaro',
      password: '1234567890',
      passwordChanged: false,
    } as CreateUserDto);

    await this.usersService.truncateTable();
    users.forEach((user) => {
      this.usersService.create(user);
    });
  }
}
