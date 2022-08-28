import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { AssetDetailEntity } from '@core/entities';
import {
  CreateAssetDetailsDto,
  FilterAssetDetailsDto,
  PaginationDto,
  UpdateAssetDetailsDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { TableNames } from '@auth/enums';
import { AssetsService } from './assets.service';

@Injectable()
export class AssetDetailsService {
  constructor(
    @Inject(RepositoryEnum.ASSET_DETAIL_REPOSITORY)
    private repository: Repository<AssetDetailEntity>,
    private assetsService: AssetsService,
  ) {}

  async truncateTable() {
    await this.repository.query(
      `TRUNCATE core.${TableNames.ASSET_DETAILS} RESTART IDENTITY CASCADE;`,
    );
  }

  async create(
    payload: CreateAssetDetailsDto,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity>> {
    const newAssetDetail = await this.repository.create(payload);

    await this.assetsService.findOne(payload.asset.id).then((res) => {
      newAssetDetail.asset = res.data;
    });

    const assetDetailCreated = await this.repository.save(newAssetDetail);

    return { data: assetDetailCreated };
  }

  async findAll(
    params: FilterAssetDetailsDto,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity[]>> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.repository.findAndCount({ relations: ['asset'] });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(
    id: number,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity>> {
    const assetDetail = await this.repository.findOne({
      relations: ['asset'],
      where: { id },
    });

    if (!assetDetail) {
      throw new NotFoundException('asset detail not found');
    }

    return { data: assetDetail };
  }

  async update(
    id: number,
    payload: UpdateAssetDetailsDto,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity>> {
    const assetDetail = await this.repository.findOneBy({ id });

    if (!assetDetail) {
      throw new NotFoundException('asset detail not found');
    }

    await this.assetsService.findOne(payload.asset.id).then((res) => {
      assetDetail.asset = res.data;
    });

    this.repository.merge(assetDetail, payload);

    const catalogueUpdated = await this.repository.save(assetDetail);

    return { data: catalogueUpdated };
  }

  async remove(
    id: number,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity>> {
    const assetDetail = await this.repository.findOneBy({ id });

    if (!assetDetail) {
      throw new NotFoundException('asset detail not found');
    }

    await this.repository.softDelete(id);

    return { data: assetDetail };
  }

  async removeAll(
    payload: number[],
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity[]>> {
    const assetDetails = await this.repository.findBy({ id: In(payload) });

    for (const assetDetail of assetDetails) {
      await this.repository.softDelete(assetDetail.id);
    }

    return { data: assetDetails };
  }

  private async paginateAndFilter(
    params: FilterAssetDetailsDto,
  ): Promise<ServiceResponseHttpModel<AssetDetailEntity[]>> {
    let where:
      | FindOptionsWhere<AssetDetailEntity>
      | FindOptionsWhere<AssetDetailEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ annualExistence: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ initialExistence: ILike(`%${search}%`) });
      where.push({ unitValue: ILike(`%${search}%`) });
      where.push({ value: ILike(`%${search}%`) });
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
