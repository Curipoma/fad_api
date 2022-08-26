import { Injectable } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { CreateCatalogueDto } from '@core/dto';

@Injectable()
export class CataloguesSeeder {
  constructor(private catalogueService: CataloguesService) {}

  run() {
    this.createPositionCatalogues();
  }

  createPositionCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];

    catalogues.push({
      name: 'Area',
    } as CreateCatalogueDto);

    catalogues.forEach((catalogue) => {
      this.catalogueService.create(catalogue);
    });
  }
}
