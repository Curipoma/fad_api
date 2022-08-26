import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
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

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserDto): Promise<ServiceResponseHttpModel> {
    const newUser = this.userRepository.create(payload);
    const userCreated = await this.userRepository.save(newUser);

    return { data: plainToInstance(ReadUserDto, userCreated) };
  }

  async findAll(params?: FilterUserDto): Promise<ServiceResponseHttpModel> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.userRepository.findAndCount();

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: plainToInstance(ReadUserDto, user) };
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.preload({ id, ...payload });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // this.userRepository.merge(user, payload);
    const userUpdated = await this.userRepository.save(user);

    return { data: plainToInstance(ReadUserDto, userUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDeleted = await this.userRepository.softRemove(user);

    return { data: plainToInstance(ReadUserDto, userDeleted) };
  }

  async removeAll(payload: UserEntity[]): Promise<ServiceResponseHttpModel> {
    const usersDeleted = await this.userRepository.softRemove(payload);
    return { data: usersDeleted };
  }

  private async paginateAndFilter(
    params: FilterUserDto,
  ): Promise<ServiceResponseHttpModel> {
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
      where.push({ username: ILike(`%${search}%`) });
    }

    const response = await this.userRepository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
