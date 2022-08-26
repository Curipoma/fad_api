import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';

@Injectable()
export class UsersSeeder {
  constructor(private usersService: UsersService) {}

  run() {
    this.createUsers();
  }

  createUsers() {
    const users: CreateUserDto[] = [];
    users.push({
      email: 'dev@fad.dev',
      lastname: 'Curipoma',
      name: 'Alvaro',
      password: '1234567890',
      passwordChanged: false,
      username: 'Alvarito',
    } as UserEntity);
    users.forEach((user) => {
      this.usersService.create(user)
    });
  }
}
