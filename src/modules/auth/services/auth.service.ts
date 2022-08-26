import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import { RepositoryEnum } from '@shared/enums';
import { LoginDto, PasswordChangeDto } from '@auth/dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async changePassword(id: string, payload: PasswordChangeDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

    if (!isMatchPassword) {
      throw new ForbiddenException('The old password is not match.');
    }

    if (payload.confirmationPassword !== payload.newPassword) {
      throw new ForbiddenException('The passwords do not match.');
    }

    user.password = payload.newPassword;

    await this.repository.save(user);

    return { data: true };
  }

  async login(payload: LoginDto) {
    const user = await this.findByUsername(payload.username);

    if (!user || !(await this.checkPassword(payload.password, user))) {
      throw new UnauthorizedException('Wrong username and/or password.');
    }

    if (user.suspendedAt) {
      throw new UnauthorizedException('User is suspended.');
    }

    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  refreshToken(user: UserEntity) {
    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  private generateJwt(user: UserEntity) {
    const payload: PayloadTokenModel = { id: user.id, role: 'admin' };
    return this.jwtService.sign(payload);
  }

  private async findByUsername(username: string) {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }

  private async checkPassword(passwordCompare: string, user: UserEntity) {
    const { password, ...userRest } = user;
    const isMatch = Bcrypt.compareSync(passwordCompare, password);

    if (isMatch) {
      userRest.maxAttempts = 3;
      await this.repository.save(userRest);
      return user;
    }

    userRest.maxAttempts =
      userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
    await this.repository.save(userRest);

    return null;
  }
}
