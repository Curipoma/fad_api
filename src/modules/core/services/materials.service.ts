import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { MaterialEntity } from '@core/entities';
import {
  CreateMaterialsDto,
  FilterMaterialsDto,
  PaginationDto,
  UpdateMaterialsDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { CataloguesService } from './catalogues.service';

@Injectable()
export class MaterialsService {
  constructor(
    @Inject(RepositoryEnum.MATERIAL_REPOSITORY)
    private repository: Repository<MaterialEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(
    payload: CreateMaterialsDto,
  ): Promise<ServiceResponseHttpModel<MaterialEntity>> {
    const newMaterial = await this.repository.create(payload);

    const materialCreated = await this.repository.save(newMaterial);

    return { data: materialCreated };
  }

  async findAllByIds(
    payload: MaterialEntity[],
  ): Promise<ServiceResponseHttpModel<MaterialEntity[]>> {
    const data = await this.repository.findAndCountBy({
      id: In(payload),
    });
    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findAll(
    params: FilterMaterialsDto,
  ): Promise<ServiceResponseHttpModel<MaterialEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({ relations: ['areas'] });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel<MaterialEntity>> {
    const material = await this.repository.findOne({
      relations: ['areas'],
      where: { id },
    });

    if (!material) {
      throw new NotFoundException('material not found');
    }

    return { data: material };
  }

  async update(
    id: number,
    payload: UpdateMaterialsDto,
  ): Promise<ServiceResponseHttpModel<MaterialEntity>> {
    const material = await this.repository.findOneBy({ id });

    if (!material) {
      throw new NotFoundException('material not found');
    }

    await this.repository.merge(material, payload);
    const materialUpdated = await this.repository.save(material);

    return { data: materialUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel<MaterialEntity>> {
    const material = await this.repository.findOneBy({ id });

    if (!material) {
      throw new NotFoundException('material not found');
    }

    await this.repository.softDelete(id);

    return { data: material };
  }

  async removeAll(
    payload: any,
  ): Promise<ServiceResponseHttpModel<MaterialEntity[]>> {
    const materials = await this.repository.findBy({ id: In(payload) });

    for (const material of materials) {
      await this.repository.softDelete(material.id);
    }

    return { data: materials };
  }

  private async paginateAndFilter(
    params: FilterMaterialsDto,
  ): Promise<ServiceResponseHttpModel<MaterialEntity[]>> {
    let where:
      | FindOptionsWhere<MaterialEntity>
      | FindOptionsWhere<MaterialEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ description: ILike(`${search}`) });
      where.push({ initialExistence: ILike(`${search}`) });
      where.push({ annualExistence: ILike(`${search}`) });
      where.push({ unitValue: ILike(`${search}`) });
      where.push({ totalValue: ILike(`${search}`) });
      where.push({ code: ILike(`${search}`) });
      where.push({ amount: ILike(`${search}`) });
      where.push({ fullAmountValue: ILike(`${search}`) });
      where.push({ unitQuantityValue: ILike(`${search}`) });
    }

    const data = await this.repository.findAndCount({
      relations: ['areas'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { limit, totalItems: data[1] } };
  }
}
