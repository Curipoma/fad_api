import { Global, Module } from '@nestjs/common';
import {
  AssetDetailsController,
  AssetsController,
  CataloguesController,
  CatalogueTypesController,
  ConsumablesController,
  MaterialsController,
} from '@core/controllers';
import {
  AssetDetailsService,
  AssetsService,
  CataloguesService,
  CatalogueTypesService,
  ConsumablesService,
  MaterialsService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    AssetDetailsController,
    AssetsController,
    CatalogueTypesController,
    CataloguesController,
    ConsumablesController,
    MaterialsController,
  ],
  providers: [
    ...coreProviders,
    AssetDetailsService,
    AssetsService,
    CatalogueTypesService,
    CataloguesService,
    ConsumablesService,
    MaterialsService,
  ],
  exports: [
    ...coreProviders,
    AssetDetailsService,
    AssetsService,
    CatalogueTypesService,
    CataloguesService,
    ConsumablesService,
    MaterialsService,
  ],
})
export class CoreModule {}

// todo agregar la asignación de fk en cada servicio =< luego probar
