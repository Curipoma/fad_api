import { DataSource } from 'typeorm';
import {
  AssetDetailEntity,
  AssetEntity,
  CatalogueEntity,
  CatalogueTypeEntity,
  ConsumableEntity,
  MaterialEntity,
} from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { UserEntity } from '@auth/entities';

export const coreProviders = [
  {
    provide: RepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ASSET_DETAIL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AssetDetailEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ASSET_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AssetEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueTypeEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CONSUMABLES_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConsumableEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MATERIAL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MaterialEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
