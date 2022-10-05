import { Global, Module } from '@nestjs/common';
import {
  AreaController,
  CataloguesController,
  CatalogueTypesController,
  MaterialsController,
} from '@core/controllers';
import {
  AreaService,
  CataloguesService,
  CatalogueTypesService,
  MaterialsService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    AreaController,
    CatalogueTypesController,
    CataloguesController,
    MaterialsController,
  ],
  providers: [
    AreaService,
    CatalogueTypesService,
    CataloguesService,
    MaterialsService,
    ...coreProviders,
  ],
  exports: [
    AreaService,
    CatalogueTypesService,
    CataloguesService,
    MaterialsService,
    ...coreProviders,
  ],
})
export class CoreModule {}
