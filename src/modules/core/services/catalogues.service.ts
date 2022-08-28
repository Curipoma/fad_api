import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateCatalogueDto,
  FilterCatalogueDto,
  PaginationDto,
  UpdateCatalogueDto,
} from '@core/dto';
import { CatalogueEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { CatalogueTypesService } from './catalogue-types.service';
import { TableNames } from '@auth/enums';

@Injectable()
export class CataloguesService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_REPOSITORY)
    private repository: Repository<CatalogueEntity>,
    private catalogueTypesService: CatalogueTypesService,
  ) {}

  async truncateTable() {
    await this.repository.query(
      `TRUNCATE core.${TableNames.CATALOGUES} RESTART IDENTITY CASCADE;`,
    );
  }

  async create(
    payload: CreateCatalogueDto,
  ): Promise<ServiceResponseHttpModel<CatalogueEntity>> {
    const newCatalogue = await this.repository.create(payload);

    this.catalogueTypesService.findOne(payload.type.id).then((res) => {
      newCatalogue.type = res.data;
    });

    const catalogueCreated = await this.repository.save(newCatalogue);

    return { data: catalogueCreated };
  }

  async findAll(
    params?: FilterCatalogueDto,
  ): Promise<ServiceResponseHttpModel<CatalogueEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({
      relations: ['type'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(
    id: number,
  ): Promise<ServiceResponseHttpModel<CatalogueEntity>> {
    const catalogue = await this.repository.findOne({
      relations: ['type'],
      where: { id },
    });

    if (!catalogue) {
      throw new NotFoundException(`Catalogue ${id} not found`);
    }

    return { data: catalogue };
  }

  async update(
    id: number,
    payload: UpdateCatalogueDto,
  ): Promise<ServiceResponseHttpModel<CatalogueEntity>> {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    await this.catalogueTypesService.findOne(payload.type.id).then((res) => {
      catalogue.type = res.data;
    });

    await this.repository.merge(catalogue, payload);

    const catalogueCreated = await this.repository.save(catalogue);

    return { data: catalogueCreated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel<CatalogueEntity>> {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    await this.repository.softDelete(id);

    return { data: catalogue };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<CatalogueEntity[]>> {
    const catalogues = await this.repository.findBy({ id: In(payload) });

    for (const catalogue of catalogues) {
      await this.repository.softDelete(catalogue.id);
    }

    return { data: catalogues };
  }

  private async paginateAndFilter(
    params: FilterCatalogueDto,
  ): Promise<ServiceResponseHttpModel<CatalogueEntity[]>> {
    let where:
      | FindOptionsWhere<CatalogueEntity>
      | FindOptionsWhere<CatalogueEntity>[];
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
      relations: ['type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { totalItems: data[1], limit } };
  }
}
