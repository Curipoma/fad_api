import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { AssetEntity } from '@core/entities';
import {
  CreateAssetDto,
  FilterAssetDto,
  PaginationDto,
  UpdateAssetDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { CataloguesService } from './catalogues.service';

@Injectable()
export class AssetsService {
  constructor(
    @Inject(RepositoryEnum.ASSET_REPOSITORY)
    private repository: Repository<AssetEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(
    payload: CreateAssetDto,
  ): Promise<ServiceResponseHttpModel<AssetEntity>> {
    const newAsset = await this.repository.create(payload);

    await this.cataloguesService.findOne(payload.type.id).then((res) => {
      newAsset.type = res.data;
    });

    const assetCreated = await this.repository.save(newAsset);

    return { data: assetCreated };
  }

  async findAll(
    params?: FilterAssetDto,
  ): Promise<ServiceResponseHttpModel<AssetEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({ relations: ['type'] });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel<AssetEntity>> {
    const asset = await this.repository.findOne({
      relations: ['type'],
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException('asset not found');
    }

    return { data: asset };
  }

  async update(
    id: number,
    payload: UpdateAssetDto,
  ): Promise<ServiceResponseHttpModel<AssetEntity>> {
    const asset = await this.repository.findOneBy({ id });

    if (!asset) {
      throw new NotFoundException('asset not found');
    }

    await this.cataloguesService.findOne(payload.type.id).then((res) => {
      asset.type = res.data;
    });

    await this.repository.merge(asset, payload);
    const assetUpdated = await this.repository.save(asset);

    return { data: assetUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel<AssetEntity>> {
    const asset = await this.repository.findOneBy({ id });

    if (!asset) {
      throw new NotFoundException('asset not found');
    }

    await this.repository.softDelete(id);

    return { data: asset };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<AssetEntity[]>> {
    const assets = await this.repository.findBy({ id: In(payload) });

    for (const asset of assets) {
      await this.repository.softDelete(asset.id);
    }

    return { data: assets };
  }

  private async paginateAndFilter(
    params: FilterAssetDto,
  ): Promise<ServiceResponseHttpModel<AssetEntity[]>> {
    let where: FindOptionsWhere<AssetEntity> | FindOptionsWhere<AssetEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ code: ILike(`%${search}%`) });
      where.push({ monetaryValue: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      relations: ['type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { data: data[0], pagination: { limit, totalItems: data[1] } };
  }
}
