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
    ...coreProviders,
    AreaService,
    CatalogueTypesService,
    CataloguesService,
    MaterialsService,
  ],
  exports: [
    ...coreProviders,
    AreaService,
    CatalogueTypesService,
    CataloguesService,
    MaterialsService,
  ],
})
export class CoreModule {}

// todo agregar la asignación de fk en cada servicio =< luego probar
