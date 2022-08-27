import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { ConsumableEntity } from '@core/entities';
import {
  CreateConsumablesDto,
  FilterConsumablesDto,
  PaginationDto,
  UpdateConsumablesDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { AssetsService } from './assets.service';

@Injectable()
export class ConsumablesService {
  constructor(
    @Inject(RepositoryEnum.CONSUMABLES_REPOSITORY)
    private repository: Repository<ConsumableEntity>,
    private assetsService: AssetsService,
  ) {}

  async create(
    payload: CreateConsumablesDto,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity>> {
    const newConsumable = await this.repository.create(payload);

    await this.assetsService.findOne(payload.asset.id).then((res) => {
      newConsumable.asset = res.data;
    });

    const consumableCreated = await this.repository.save(newConsumable);

    return { data: consumableCreated };
  }

  async findAll(
    params: FilterConsumablesDto,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({ relations: ['asset'] });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(
    id: number,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity>> {
    const consumable = await this.repository.findOne({
      relations: ['asset'],
      where: { id },
    });

    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }

    return { data: consumable };
  }

  async update(
    id: number,
    payload: UpdateConsumablesDto,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity>> {
    const consumable = await this.repository.findOneBy({ id });

    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }

    await this.assetsService.findOne(payload.asset.id).then((res) => {
      consumable.asset = res.data;
    });

    await this.repository.merge(consumable, payload);

    const consumableUpdated = await this.repository.save(consumable);

    return { data: consumableUpdated };
  }

  async remove(
    id: number,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity>> {
    const consumable = await this.repository.findOneBy({ id });

    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }

    await this.repository.softDelete(id);

    return { data: consumable };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<ConsumableEntity[]>> {
    const consumables = await this.repository.findBy({ id: In(payload) });

    for (const assetDetail of consumables) {
      await this.repository.softDelete(assetDetail.id);
    }

    return { data: consumables };
  }

  private async paginateAndFilter(
    params: FilterConsumablesDto,
  ): Promise<ServiceResponseHttpModel<ConsumableEntity[]>> {
    let where:
      | FindOptionsWhere<ConsumableEntity>
      | FindOptionsWhere<ConsumableEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ amount: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ description: ILike(`%${search}%`) });
      where.push({ totalValue: ILike(`%${search}%`) });
      where.push({ unitValue: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      relations: ['asset'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { limit, totalItems: data[1] } };
  }
}
