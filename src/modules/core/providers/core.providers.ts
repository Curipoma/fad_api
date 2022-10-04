import { DataSource } from 'typeorm';
import {
  AreaEntity,
  CatalogueEntity,
  CatalogueTypeEntity,
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
    provide: RepositoryEnum.AREA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AreaEntity),
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
    provide: RepositoryEnum.MATERIAL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MaterialEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
