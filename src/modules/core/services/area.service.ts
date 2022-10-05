import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { AreaEntity } from '@core/entities';
import {
  CreateAreasDto,
  FilterAreasDto,
  PaginationDto,
  UpdateAreaDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { MaterialsService } from '@core/services';

@Injectable()
export class AreaService {
  constructor(
    @Inject(RepositoryEnum.AREA_REPOSITORY)
    private repository: Repository<AreaEntity>,
    private materialsService: MaterialsService,
  ) {}

  async create(
    payload: CreateAreasDto,
  ): Promise<ServiceResponseHttpModel<AreaEntity>> {
    const newArea = await this.repository.create(payload);

    newArea.materials = await this.materialsService
      .findAllByIds(payload.materials)
      .then((response) => response.data);

    const areaCreated = await this.repository.save(newArea);

    return { data: areaCreated };
  }

  async findAll(
    params?: FilterAreasDto,
  ): Promise<ServiceResponseHttpModel<AreaEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({
      relations: ['materials'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel<AreaEntity>> {
    const area = await this.repository.findOne({
      relations: ['materials'],
      where: { id },
    });

    if (!area) {
      throw new NotFoundException('area not found');
    }

    return { data: area };
  }

  async update(
    id: number,
    payload: UpdateAreaDto,
  ): Promise<ServiceResponseHttpModel<AreaEntity>> {
    const area = await this.repository.findOneBy({ id });

    if (!area) {
      throw new NotFoundException('area not found');
    }

    area.materials = await this.materialsService
      .findAllByIds(payload.materials)
      .then((response) => response.data);

    await this.repository.merge(area, payload);
    const areaUpdated = await this.repository.save(area);

    return { data: areaUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel<AreaEntity>> {
    const area = await this.repository.findOneBy({ id });

    if (!area) {
      throw new NotFoundException('area not found');
    }

    await this.repository.softDelete(id);

    return { data: area };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<AreaEntity[]>> {
    const areas = await this.repository.findBy({ id: In(payload) });

    for (const area of areas) {
      await this.repository.softDelete(area.id);
    }

    return { data: areas };
  }

  private async paginateAndFilter(
    params: FilterAreasDto,
  ): Promise<ServiceResponseHttpModel<AreaEntity[]>> {
    let where: FindOptionsWhere<AreaEntity> | FindOptionsWhere<AreaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ name: ILike(`${search}`) });
      where.push({ unitMonetaryValue: ILike(`${search}`) });
      where.push({ code: ILike(`${search}`) });
    }

    const data = await this.repository.findAndCount({
      relations: ['materials'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { limit, totalItems: data[1] } };
  }

  async findAllByIds(
    payload: AreaEntity[],
  ): Promise<ServiceResponseHttpModel<AreaEntity[]>> {
    const data = await this.repository.findAndCountBy({
      id: In(payload),
    });
    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }
}
