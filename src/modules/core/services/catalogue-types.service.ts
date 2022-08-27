import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateCatalogueTypesDto,
  FilterCatalogueTypesDto,
  PaginationDto,
  UpdateCatalogueTypesDto,
} from '@core/dto';
import { CatalogueTypeEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class CatalogueTypesService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_TYPE_REPOSITORY)
    private repository: Repository<CatalogueTypeEntity>,
  ) {}

  async create(
    payload: CreateCatalogueTypesDto,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity>> {
    const newCatalogueType = await this.repository.create(payload);

    const catalogueTypeCreated = await this.repository.save(newCatalogueType);

    return { data: catalogueTypeCreated };
  }

  async findAll(
    params?: FilterCatalogueTypesDto,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(
    id: number,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity>> {
    const catalogueType = await this.repository.findOne({
      where: { id },
    });

    if (!catalogueType) {
      throw new NotFoundException('Catalogue type not found');
    }

    return { data: catalogueType };
  }

  async update(
    id: number,
    payload: UpdateCatalogueTypesDto,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity>> {
    const catalogueType = await this.repository.findOneBy({ id });

    if (!catalogueType) {
      throw new NotFoundException('Catalogue type not found');
    }

    await this.repository.merge(catalogueType, payload);
    const catalogueTypeCreated = await this.repository.save(catalogueType);

    return { data: catalogueTypeCreated };
  }

  async remove(
    id: number,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity>> {
    const catalogueType = await this.repository.findOneBy({ id });

    if (!catalogueType) {
      throw new NotFoundException('Catalogue type not found');
    }

    await this.repository.softDelete(id);

    return { data: catalogueType };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity[]>> {
    const catalogueTypes = await this.repository.findBy({ id: In(payload) });

    for (const catalogueType of catalogueTypes) {
      await this.repository.softDelete(catalogueType.id);
    }

    return { data: catalogueTypes };
  }

  private async paginateAndFilter(
    params: FilterCatalogueTypesDto,
  ): Promise<ServiceResponseHttpModel<CatalogueTypeEntity[]>> {
    let where:
      | FindOptionsWhere<CatalogueTypeEntity>
      | FindOptionsWhere<CatalogueTypeEntity>[];
    where = {};

    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
