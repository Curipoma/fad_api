import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike, LessThan, In } from 'typeorm';
import {
  CreateUserDto,
  FilterUserDto,
  ReadUserDto,
  UpdateUserDto,
} from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { TableNames } from '@auth/enums';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
  ) {}

  async truncateTable() {
    await this.repository.query(
      `TRUNCATE ${TableNames.USERS} RESTART IDENTITY CASCADE;`,
    );
  }

  async create(
    payload: CreateUserDto,
  ): Promise<ServiceResponseHttpModel<UserEntity>> {
    const newUser = await this.repository.create(payload);
    const userCreated = await this.repository.save(newUser);

    return { data: userCreated };
  }

  async findAll(
    params?: FilterUserDto,
  ): Promise<ServiceResponseHttpModel<UserEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount();

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel<UserEntity>> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: user };
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<ServiceResponseHttpModel<UserEntity>> {
    const user = await this.repository.preload({ id, ...payload });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.merge(user, payload);
    const userUpdated = await this.repository.save(user);

    return { data: userUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel<UserEntity>> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.softRemove(user);

    return { data: user };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<UserEntity[]>> {
    const users = await this.repository.findBy({ id: In(payload) });

    for (const user of users) {
      await this.repository.softDelete(user.id);
    }
    return { data: users };
  }

  private async paginateAndFilter(
    params: FilterUserDto,
  ): Promise<ServiceResponseHttpModel<UserEntity[]>> {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }
}
