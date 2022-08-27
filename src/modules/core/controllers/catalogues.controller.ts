import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CataloguesService } from '@core/services';
import {
  CreateCatalogueDto,
  FilterCatalogueDto,
  UpdateCatalogueDto,
} from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { CatalogueEntity } from '@core/entities';

@ApiTags('Catalogues')
@Controller('catalogues')
export class CataloguesController {
  constructor(private catalogueService: CataloguesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an catalogue' })
  async create(
    @Body() payload: CreateCatalogueDto,
  ): Promise<ResponseHttpModel<CatalogueEntity>> {
    const { data } = await this.catalogueService.create(payload);

    return {
      data,
      message: 'Created, a asset detail',
      title: 'Create',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find all catalogues, query params ?limit=15&page=0&search=',
  })
  async findAll(
    @Query() params: FilterCatalogueDto,
  ): Promise<ResponseHttpModel<CatalogueEntity[]>> {
    const { data, pagination } = await this.catalogueService.findAll(params);

    return {
      data,
      pagination,
      message: `Found all catalogues (search = ${params.search ?? 'empty'})`,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one catalogue' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<CatalogueEntity>> {
    const { data } = await this.catalogueService.findOne(id);

    return {
      data,
      message: `Found one, catalogue ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update an catalogue' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCatalogueDto,
  ): Promise<ResponseHttpModel<CatalogueEntity>> {
    const { data } = await this.catalogueService.update(id, payload);

    return {
      data,
      message: `Updated, catalogue type ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove an catalogue' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<CatalogueEntity>> {
    const { data } = await this.catalogueService.remove(id);

    return {
      data,
      message: `Remove, catalogue ${id}`,
      title: `Remove`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove all catalogues' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<CatalogueEntity[]>> {
    const { data } = await this.catalogueService.removeAll(payload);

    return {
      data,
      message: `Remove all catalogues ${payload.toString()}`,
      title: `Remove`,
    };
  }
}
