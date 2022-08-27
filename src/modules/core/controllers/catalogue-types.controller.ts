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
import { CatalogueTypesService } from '@core/services';
import {
  CreateCatalogueTypesDto,
  FilterCatalogueTypesDto,
  UpdateCatalogueTypesDto,
} from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { CatalogueTypeEntity } from '@core/entities';

@ApiTags('Catalogue Types')
@Controller('catalogue-types')
export class CatalogueTypesController {
  constructor(private catalogueTypesService: CatalogueTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a catalogue type' })
  async create(
    @Body() payload: CreateCatalogueTypesDto,
  ): Promise<ResponseHttpModel<CatalogueTypeEntity>> {
    const { data } = await this.catalogueTypesService.create(payload);

    return {
      data,
      message: 'Created, a catalogue type',
      title: 'Created',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find all catalogues types, query params ?limit=15&page=0&search=',
  })
  async findAll(
    @Query() params: FilterCatalogueTypesDto,
  ): Promise<ResponseHttpModel<CatalogueTypeEntity[]>> {
    const { data, pagination } = await this.catalogueTypesService.findAll(
      params,
    );

    return {
      data,
      pagination,
      message: `Found all catalogue types (search = ${
        params.search ?? 'empty'
      })`,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one catalogue type' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<CatalogueTypeEntity>> {
    const { data } = await this.catalogueTypesService.findOne(id);

    return {
      data,
      message: `Found one, catalogue type ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update a catalogue type' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCatalogueTypesDto,
  ): Promise<ResponseHttpModel<CatalogueTypeEntity>> {
    const { data } = await this.catalogueTypesService.update(id, payload);

    return {
      data,
      message: `Updated, catalogue type ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove a catalogue type' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<CatalogueTypeEntity>> {
    const { data } = await this.catalogueTypesService.remove(id);

    return {
      data,
      message: `Removed, catalogue type ${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove all catalogue types' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<CatalogueTypeEntity[]>> {
    const { data } = await this.catalogueTypesService.removeAll(payload);

    return {
      data,
      message: `Removed all catalogue types ${payload.toString()}`,
      title: `Removed`,
    };
  }
}
